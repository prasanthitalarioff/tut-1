import streamlit as st

st.title("Hi I'm Prasanthi")
st.subheader("Hi I'm your subheader")
st.header("I'm header")
st.text("I'm a text, your paragraph function")
st.markdown("**bold** *italic*")
json_data = {
    "name": "John",
    "age": 30,
    "city": "New York",
    "pets": ["dog", "cat"]
}

# Display JSON data
st.json(json_data)
code = """ 
def print():
    print("Hi Mini)
print()
"""
st.code(code, language="python")