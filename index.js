module.exports = function (content, file, settings) {
	if (file.generated || file.basename === 'list.html') {
		return content;
	}

	if (!settings) {
		return fis.log.error("settings is required! ");
	}

	Object.keys(settings).forEach(function (channel) {
		var newFile = fis.file.wrap(file.dirname + "/" + file.filename + "_" + channel + file.ext);
		newFile.generated = true;
		var _content = content;
		var config = settings[channel];
		config.channel = channel;
		['channel', 'btn1', 'btn2', 'btn3'].forEach(function (str) {
			_content = _content.replace(new RegExp("\\$\\{" + str + "\\}", "ig"), config[str]);
		});
		newFile.setContent(_content);
		fis.compile(newFile);
	});
	return content;
}