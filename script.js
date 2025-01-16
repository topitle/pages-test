document.getElementById('eventForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form inputs
  const title = document.getElementById('eventTitle').value;
  const description = document.getElementById('eventDescription').value;
  const dateTime = new Date(document.getElementById('eventDate').value);

  if (isNaN(dateTime.getTime())) {
    alert('Please select a valid date and time.');
    return;
  }

  // Create .ics file content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(dateTime)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  // Create a downloadable link
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = url;
  downloadLink.download = `${title.replace(/\s+/g, '_')}.ics`;
  downloadLink.style.display = 'inline-block';
  downloadLink.textContent = 'Download Event';
});

// Helper function to format date for iCalendar
function formatDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
