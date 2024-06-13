import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";

import MyButton from "./MyButton.js";

export default {
	name: "App",
	template: `
		<div>
			<h1>Hello {{name}}</h1>
			<div v-if="workers.length === 0">No workers available.</div>
			<div v-else>
				<hr/>
					<my-button>normal</my-button>
					<my-button type="danger"
										@click="toggleLabel">{{label}}</my-button>
					<my-button type="success">success</my-button>
					<my-button type="info">info</my-button>
					<my-button :disabled="true">disabled</my-button>
					<my-button @click="callback">lalala</my-button>
				<hr/>
				<input v-model="searchString"
				       placeholder="search"
				       class="mb-1">
				<table>
					<thead>
						<tr>
							<th v-for="header in headers"
							    v-on:click="setSortColumn(header.key)">
								{{ header.value }}
								<span class="arrow"
								      :class="{
								        active: this.sortColumn === header.key && this.order === 'ASC'
								      }">
									&#8593;
								</span>
								<span class="arrow"
								      :class="{
								        active: this.sortColumn === header.key && this.order === 'DESC'
								      }">
									&#8595;
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="worker in filteredWorkers">
							<td>{{worker.name}}</td>
							<td>{{worker.position}}</td>
							<td>{{worker.office}}</td>
							<td>{{worker.age}}</td>
						</tr>
					</tbody>
				</table>
			</div>
    </div>
  `,
	data() {
		return {
			uuid: uuidv4(),
			name: "Dominic",
			searchString: "",
			sortColumn: "",
			order: "ASC",
			headers: [],
			workers: [],
			label: "danger",
			disabled: true,
		};
	},
	computed: {
		filteredWorkers() {
			const filteredWorkers =
				this.searchString === ""
					? this.workers
					: this.workers.filter(
							(wo) =>
								Object.values(wo).join("").indexOf(this.searchString) !== -1,
						);

			const column = this.sortColumn;
			const order = this.order;

			filteredWorkers.sort(function (a, b) {
				var nameA = a[column] + "".toUpperCase();
				var nameB = b[column] + "".toUpperCase();
				if (order === "DESC" && nameA > nameB) {
					return -1;
				}
				if (order === "DESC" && nameA < nameB) {
					return 1;
				}
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});

			return filteredWorkers;
		},
	},
	components: {
		MyButton,
	},
	methods: {
		setSortColumn(column) {
			if (this.sortColumn === column) {
				this.order = this.order === "ASC" ? "DESC" : "ASC";
			} else {
				this.order = "ASC";
				this.sortColumn = column;
			}
		},
		async getWorkers() {
			const workers = [
				{
					name: "Airi Satou",
					position: "Accountant",
					office: "Tokyo",
					age: 33,
				},
				{
					name: "Angelica Ramos",
					position: "Chief Executive Officer (CEO)",
					office: "London",
					age: 47,
				},
				{
					name: "Cedric Kelly",
					position: "Senior Javascript Developer",
					office: "Edinburgh",
					age: 22,
				},
				{
					name: "Jennifer Chang",
					position: "Regional Director",
					office: "Singapore",
					age: 28,
				},
			];

			const headers = [
				{ key: "name", value: "Name" },
				{ key: "position", value: "Position" },
				{ key: "office", value: "Office" },
				{ key: "age", value: "Age" },
			];

			this.headers = headers;
			this.workers = workers;
		},
		addStyling() {
			const style = `
				#dom_${this.uuid}	{
					& th {
						cursor: pointer;
						user-select: none;
						& .arrow {
							color: gray;
						}
						& .active {
							color: black;
						}
					}
				}
			`;
			const sheet = new CSSStyleSheet();
			sheet.replaceSync(style);
			if (document.adoptedStyleSheets.length === 0) {
				document.adoptedStyleSheets = [sheet];
			} else {
				document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
			}
			this.$el.id = `dom_${this.uuid}`;
		},
		toggleLabel: function (e) {
			if (this.label == "danger") {
				this.label = "danger-changed";
			} else {
				this.label = "danger";
			}
		},
		callback: function () {
			alert("llalalala");
		},
	},
	mounted() {
		this.getWorkers();
		this.addStyling();
	},
};
