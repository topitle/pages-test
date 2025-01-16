console.log("Script is loaded and running.");

document.getElementById('eventForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form inputs
  const title = document.getElementById('eventTitle').value;
  const description = document.getElementById('eventDescription').value;
  const dateTime = new Date(document.getElementById('eventDate').value);

  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Date:", dateTime);

  if (isNaN(dateTime.getTime())) {
    alert('Please select a valid date and time.');
    return;
  }

  const event = {
    title,
    description,
    start: startDate.toISOString(),
    duration: [1, 'hour'], // Duration of 1 hour
  };

  // Use calendarLink (exposed globally)
  const googleLink = calendarLink.google(event);
  const outlookLink = calendarLink.outlook(event);
  const icsLink = calendarLink.ics(event);

  // Add links to the page
  const calendarLinksDiv = document.getElementById('calendarLinks');
  calendarLinksDiv.innerHTML = `
    <p><a href="${googleLink}" target="_blank">Add to Google Calendar</a></p>
    <p><a href="${outlookLink}" target="_blank">Add to Outlook Calendar</a></p>
    <p><a href="data:text/calendar;charset=utf-8,${encodeURIComponent(icsLink)}" download="${title.replace(/\s+/g, '_')}.ics">Download .ICS</a></p>
  `;

});

// Helper function to format date for iCalendar
function formatDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
