import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 6,
    height: 'auto',
    margin: 20,
    paddingVertical: 10,
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 5,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    paddingTop: 5,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
    paddingHorizontal: 5,
    color: 'black',
    textAlign: 'right',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 5,
    borderRadius: 6,
    elevation: 1,
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  buttonText: {
    color: 'red',
    fontSize: 22,
    fontWeight: '800',
    paddingVertical: 5,
  },
});
