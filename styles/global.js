import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 300,
    backgroundColor: 'white',
    marginVertical: 4,
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 300,
    height: 200,
    backgroundColor: 'white',
    marginVertical: 4
  },

  messageBox: {
    fontWeight: 'bold',
    marginVertical: 8,
    fontSize: 18,
  },

  error: {
    color: 'red',
    marginVertical: 2,
  },

  message: {
    color: 'green',
    marginVertical: 2,
  }
});