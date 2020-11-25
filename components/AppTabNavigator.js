import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator';
import ExchangeScreen from '../screens/ExchangeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: AppStackNavigator,
        navigationOptions :{
          tabBarIcon : <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmauUTj7Hddb7bDwoAPh3U-idkXzw0MaP28A&usqp=CAU"}} style={{width:20, height:20}}/>,
          tabBarLabel : "Home",
        }
    },
    Exchange : {
        screen: ExchangeScreen,
        navigationOptions :{
        tabBarIcon : <Image source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAXVBMVEX///8AAAALCwv7+/snJycTExPX19e6urrQ0NDAwMChoaGnp6cfHx/l5eXf398jIyPt7e04ODg9PT1kZGTIyMhISEhDQ0NeXl52dnb19fWAgICKiopNTU1qamowMDDa/kfOAAADMklEQVR4nO3b6W6jMBSGYUwW6ABpkzbpPvd/mVN1CngByuJz7GN9789ImPOolcLiZBlCCCGEEEIIIYQQQgghhBBCCCGidmW5Cz2Dj6paqboKPcX2CvXdn9BzbO6sEpEolYhEpSJRqUhUKhKVikSlIlGpSFQqEhsiVuJApEra8ffSJe30jXRJO3wmXdJBpEt6iHCJBpEt0SGiJQZEssSERCxpjtNZkFglhTbWdN0hUUru5jI0SJSSyxpIjJJ8FSRCyWG242AcF53keTbk0TwwNklzP9Nx39hHRiZ5eDnvf+/88uAcGZtkfZDEF6Pk9ZV0eS7J01mpyxPhCZgkxff3dl6SnSDjkRQ/1x9XovX/Ry9pHSonWb6LWlL014MEq+vRSjQHNYRUojvIIYQSw0EP0SX5yeO6poMBokve/K1qOTgg7UYP5dy4bFnTvn/1tvJ4ZX+r+e5rTcfBANEcB/fOZV2ugx6iOfI7T2tqjgMXhNpRMkHIHfbjZ6LoHTwQBgcLhMPBAWFxMEB4HPQQJgc5hNpxbD9sT7LbXFjHwL6eteXXo3NOPsfOH8RYl9vhF6I+gjk8Q8yHSpyORS8IZxTOkX1QQZgd2XH+q85FEG7Hl+TDIyWgw082RKrDhoh1WBC5DhMi2GFAJDt0iGiHBpHt6CHCHR1EuqODSHe495neHA2rw4F4c2TvrA4b4s+RPXaLFt7WnIjMkb11qzr78ygic2SnnFVC5siySnFK6BzMEkIHr4TSwSrJKR2ckiupg1FS5qQOTslNqRvlxki+/66RFyTe4v0+oQyS+JqWNJ/7+vf2n752Jm1pStLUal51DH/NCcn89yPPYWY3G5fMf2N1GFmbtzHJgneIxLvO5zYiWQC5hRveaFgyH5KT/sZkScOSuY6/dBeEixuUtJ+cpovhW6RvSNJ+EHSwxQ1IZEIGJEIhrkQqxJGIhdgSuRBLIhhiSiRDDIloiC6RDRmQhJ5obY4k9ECrsyWh51lflQrEkoSeZktVKhBDEnqWbVWpQHpJJM961tdKLqEH2dyPJKJnJGsr6q9LR5YNK+SdfP7eHyGEEEIIIYQQQgghhBBCCCGEkNk/6HgmhFyEXB8AAAAASUVORK5CYII="}} style={{width:30, height:30}}/>,
        tabBarLabel : "Exchange",
        }
    }
});