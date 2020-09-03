import sankeydiagram from "rawcharts/sankeydiagram"
import data from "../datasets/energy.csv"

export default {
  chart: sankeydiagram,
  data,
  dataTypes: {
	  "source": "string",
	  "target": "string",
	  "value": "number"
	},
  mapping: {
    source: { value: ["source"] },
		target: { value: ["target"] },
    size: {
			value: ["value"],
			config: {"aggregation": ["sum"]}
		},
  },
  visualOptions: {
    width: 500,
    height: 500
  },
}
