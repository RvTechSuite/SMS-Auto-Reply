function deleteSelfOnReturn() {
  var returnDate = new Date('2026-04-29T08:00:00'); // Set as your return day in this format yyyy-mm-ddThh:mm:ss
  
  if (new Date() >= returnDate) {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
    PropertiesService.getScriptProperties().deleteProperty('repliedNumbers');
  }
}

function AutoReplyr() {
  deleteSelfOnReturn();

  var response_msg = "Put your away message here"; // Input your away message here
  var label_s = "SMS";
  var label_r = "SMS/AutoResponse";

  // Get the list of numbers we've already replied to
  var props = PropertiesService.getScriptProperties();
  var repliedTo = JSON.parse(props.getProperty('repliedNumbers') || '[]');

  var msg_threads = GmailApp.search("label:" + label_s + " label:unread newer_than:1h");

  for (var i = 0; i < msg_threads.length; i++) {

    // Extract the sender's phone number from the subject line
    var subject = msg_threads[i].getFirstMessageSubject();
    var match = subject.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
    var senderNumber = match ? match[0].replace(/\D/g, '') : null;

    // Skip if we've already replied to this number
    if (senderNumber && repliedTo.indexOf(senderNumber) !== -1) {
      GmailApp.markThreadRead(msg_threads[i]);
      continue;
    }

    // Reply to message
    msg_threads[i].reply(response_msg);

    // Mark as read and apply labels
    GmailApp.markThreadRead(msg_threads[i]);
    GmailApp.getUserLabelByName(label_s).removeFromThread(msg_threads[i]);
    GmailApp.getUserLabelByName(label_r).addToThread(msg_threads[i]);

    // Remember this number so we don't reply again
    if (senderNumber) {
      repliedTo.push(senderNumber);
      props.setProperty('repliedNumbers', JSON.stringify(repliedTo));
    }
  }
}

function clearRepliedNumbers() {
  PropertiesService.getScriptProperties().deleteProperty('repliedNumbers');
}
