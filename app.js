// Fetch markers from the database
async function fetchMarkers() {
  const { data, error } = await supabase
    .from('custom_markers')
    .select('id, marker_url, animation_url, scale, position, rotation');
  
  if (error) {
    console.error('Error fetching markers:', error);
    return;
  }

  // Assume we're displaying the first marker for simplicity
  if (data.length > 0) {
    const marker = data[0];
    setMarker(marker);
  }
}

// Set up the marker in the AR scene
function setMarker(marker) {
  const markerURL = marker.marker_url;  // URL of the .patt file (marker pattern)
  const animationURL = marker.animation_url;  // URL of the .gif animation

  // Update the pattern URL for the marker
  document.querySelector('#marker').setAttribute('url', markerURL);

  // Set the GIF as the texture for the plane
  const plane = document.querySelector('a-plane');
  plane.setAttribute('src', animationURL);

  // Optionally, adjust scale, position, or rotation of the plane
  if (marker.scale) {
    plane.setAttribute('scale', marker.scale);
  }
  if (marker.position) {
    plane.setAttribute('position', marker.position);
  }
  if (marker.rotation) {
    plane.setAttribute('rotation', marker.rotation);
  }
}

fetchMarkers();
