import streamlit as st
import pandas as pd
import streamlit.components.v1 as components

# Fetch earthquake data
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
df = pd.read_json(url)

# Display the map using streamlit-leaflet
st.title("Earthquake Data Map")
my_map = components.declare_component(
    "my_map",
    url="http://localhost:3001",
)

# Create a streamlit-leaflet map
map_data = {
    "df": df.to_json(),
}
my_map(data=map_data, key="my_map")

# Show earthquake information when a marker is clicked
selected_marker = st.empty()
if st.session_state.selected_marker:
    selected_marker.json(st.session_state.selected_marker)


# Add a button to refresh the map
if st.button("Refresh Map"):
    st.session_state.selected_marker = None
    st.experimental_rerun()
