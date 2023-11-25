import OSS from "ali-oss";

export interface OssClientInitProps {
	region: string;
	accessKeyId: string;
	accessKeySecret: string;
	bucket: string;
}

class OssClient {
	constructor(props: OssClientInitProps) {
		const store = new OSS({
			region: props.region,
			accessKeyId: props.accessKeyId,
			accessKeySecret: props.accessKeySecret,
			bucket: props.bucket,
		});
		this.store = store;
	}

	store: OSS;

	getList() {
		return this.store.get('apis/storybook/data.json', undefined, {
			headers: {
				'Content-type': 'application/json'
			}
		})
	}

	async add(newItem: {
		id: string
		title: string
		date: string
		tags: string[]
	}) {
		const res = await this.getList()
		const events = JSON.parse(res.content.toString()).events
		const newEvents = [
			...events,
			newItem
		]
		console.log('hahaha', newEvents)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
		return this.store.put(`/apis/storybook/data.json`, new OSS.Buffer(JSON.stringify({
			events: newEvents
		}, null, 2)))
	}
}

export default OssClient;
