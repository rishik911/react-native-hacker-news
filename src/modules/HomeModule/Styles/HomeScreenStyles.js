import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  activityLoader: {
    transform: [
      {
        scale: 3,
      },
    ],
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  erroView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
  },
  listContainer: {
    flexGrow: 1,
  },
  titleStyleStatic: {
    color: 'white',
    fontSize: 30,
    fontWeight: '900',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  titleStyle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  dynamicHeaderContainer: {
    height: 50,
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  imageHolder: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});
