const getXml = (json, backTime, word) => {
  return `
			<xml>
				<ToUserName><![CDATA[${json.xml.FromUserName}]]></ToUserName>
				<FromUserName><![CDATA[${json.xml.ToUserName}]]></FromUserName>
				<CreateTime>${backTime}</CreateTime>
				<MsgType><![CDATA[text]]></MsgType>
				<Content><![CDATA[${word}]]></Content>
			</xml>
		`
}

module.exports = {
  getXml
}
