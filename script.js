<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Event Creator</title>
</head>
<body>
  <form id="eventForm">
    <input type="text" id="eventTitle" placeholder="Title" required>
    <input type="datetime-local" id="eventDate" required>
    <button type="submit">Create Event</button>
  </form>
  <a id="downloadLink" style="display:none;">Download Event</a>

  <script>
    document.getElementById('eventForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const title = document.getElementById('eventTitle').value;
      const dateTime = new Date(document.getElementById('eventDate').value);

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `DTSTART:${dateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
        `SUMMARY:${title}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\n');

      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.getElementById('downloadLink');
      downloadLink.href = url;
      downloadLink.download = `${title.replace(/\s+/g, '_')}.ics`;
      downloadLink.style.display = 'inline-block';
      downloadLink.textContent = 'Download Event';
    });
  </script>
</body>
</html>
