// Targeted scripts can only be invoked by you, the user, eg via a right-click option on the Sites or History tabs

// The following handles differences in printing between Java 7's Rhino JS engine
// and Java 8's Nashorn JS engine
if (typeof println == 'undefined') this.println = print;

function invokeWith(msg) {
	// Debugging can be done using println like this
	println('Finding comments under ' + msg.getRequestHeader().getURI().toString()); 
	prefix = msg.getRequestHeader().getURI().toString();

	extHist = org.parosproxy.paros.control.Control.getSingleton().
	    getExtensionLoader().getExtension(
	        org.parosproxy.paros.extension.history.ExtensionHistory.NAME) 
	if (extHist != null) {
	    i=1
	    while (hr = extHist.getHistoryReference(i), hr) {
	        if (hr) { 
			url = hr.getHttpMessage().getRequestHeader().getURI().toString();
			if (prefix.equals(url.substr(0,prefix.length()))) {
				// Under the selected node
				body = hr.getHttpMessage().getResponseBody().toString()
				// Look for html comments
				if (body.indexOf('<!--') > 0) {
		           	println(hr.getHttpMessage().getRequestHeader().getURI()) 
					o = body.indexOf('<!--');
					while (o > 0) {
						e = body.indexOf('-->', o);
			           	println("\t" + body.substr(o,e-o+3)) 
						o = body.indexOf('<!--', e);
					}
				}
			}
	        }
		i++
	    }
	}

}
