import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
          films: [],
          isLoading: false
          
        }
        this.searchedText = ""
      }

    // Recherche de film
    _loadFilms() {
        this.setState({ isLoading: true })
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages= data.total_pages
                this.setState({ 
                    films: [ ...this.state.films, ...data.results ],
                    isLoading: false 
                })
            }
        )}else{
            this.setState({isLoading: false })
            return(
                <Text style={styles.text}>Pas de résultat</Text>
            )
        }
    }
    
    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }
    
    _searchFilm(){
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            // console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms()    
        })
    }

    // Afficher les details d'un film
    _displayDetailForFilm = (idFilm) => {
       this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render(){
        return (
        <View style={styles.main_container}>
            <Text style={styles.default_text}>Entrez le titre d'un film</Text>
            <TextInput style={styles.textinput} placeholder="Titre du film" onSubmitEditing={() => this._searchFilm()} onChangeText={(text) => this._searchTextInputChanged(text)}/>
            {/* <Button style={{ height: 50 }} title="Rechercher" onPress={() => this._searchFilm()}/> */}
            <FlatList
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.page < this.totalPages) {
                        this._loadFilms()
                    }
                }}
                renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
            />
            {this._displayLoading()}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex: 1
    },
    textinput: {
        margin: 5,
        height: 50,
        borderColor: '#000000',
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 70,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    default_text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    alert_text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50
    }
})

export default Search