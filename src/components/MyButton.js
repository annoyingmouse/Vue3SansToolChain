import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";

export default {
	name: "MyButton",
	template: `
    <button class="normal"
            v-bind:class="type"
            v-bind:disabled="disabled">
        <slot></slot>
    </button>
  `,
	props: {
		type: String,
		disabled: Boolean,
	},
	data() {
		return {
			uuid: uuidv4(),
		};
	},
	methods: {
		callback: function (e) {
			this.$emit("click", e);
		},
		addStyling() {
			const style = `
				#dom_${this.uuid}	{
					padding: 10px 20px;
					border: 1px solid #ddd;
					color: #333;
					background-color:#fff;
					border-radius: 4px;
					font-size: 14px;
					cursor: pointer;
  				font-family: '微软雅黑',Arial,Helvetica,sans-serif;
					&.danger {
						background-color: #ff4949;
						color: #FFFFFF;
					}
					&.success {
						background-color: #13ce66;
						color: #FFFFFF;
					}
					&.info {
						background-color: #50bfff;
						color: #FFFFFF;
					}
					&[disabled]{
						cursor: not-allowed;
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
	},
	mounted() {
		this.addStyling();
	},
};
