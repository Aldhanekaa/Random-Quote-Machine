import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      multipleQuotes: false,
      quotes: [],
      quote: 'The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency. The second is that automation applied to an inefficient operation will magnify the inefficiency.',
      quoteAuthor: 'Bill Gates',
      quoteGenre: 'Business'
    }
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.getMultipleQuotes = this.getMultipleQuotes.bind(this)
  }
  async getMultipleQuotes(event) {
    const URL = `https://quote-garden.herokuapp.com/api/v2/authors/${this.state.quoteAuthor}?page=1&limit=5`
    const multipleQuotes = await this.multipleQuotes(URL);
    // console.log(multipleQuotes)
    this.setState({
      multipleQuotes: true,
      quotes: multipleQuotes['quotes']
    })
  }
  async getRandomQuote() {
    const URL = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';
    const { quote: { quoteAuthor, quoteGenre, quoteText } } = await this.getQuote(URL);
    this.setState({
      multipleQuotes: false,
      quote: quoteText,
      quoteAuthor: quoteAuthor,
      quoteGenre: quoteGenre,
    })
  }
  getQuote(URL) {
    return fetch(URL)
      .then(response => response.json())
      .then(response => {
        return response
      })
  }
  multipleQuotes(URL) {
    return fetch(URL)
      .then(response => response.json())
      .then(response => response);
  }
  render() {
    return (
      <div className="App" >
        <Header getRandomQuote={this.getRandomQuote} />
        <Main quote={this.state.quote} author={this.state.quoteAuthor} quoteGenre={this.state.quoteGenre} multipleQuotes={this.state.multipleQuotes} getMultipleQuotes={this.getMultipleQuotes} quotes={this.state.quotes} />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <button onClick={this.props.getRandomQuote} id="new-quote">Generate <i className="fas fa-sync-alt"></i></button>
      </header>
    )
  }
}

class Main extends Component {
  render() {
    console.log(this.props.quotes)
    let quotes = this.props.quotes.map(({ quoteGenre, quoteText, quoteAuthor }) => {
      return <QuoteBox quote={quoteText} author={quoteAuthor} quoteGenre={quoteGenre} multipleQuotes={this.props.multipleQuotes} getMultipleQuotes={this.props.getMultipleQuotes} />
    })
    return (
      <main id="main">
        {this.props.multipleQuotes ?
          <div className="quotess"><div id="authorName"><h1>{this.props.author}</h1></div> {quotes}</div>
          : <QuoteBox quote={this.props.quote} author={this.props.author} quoteGenre={this.props.quoteGenre} multipleQuotes={this.props.multipleQuotes} getMultipleQuotes={this.props.getMultipleQuotes} />}

      </main>
    )
  }
}

class QuoteBox extends Component {
  render() {
    return (
      <div id="quote-box">
        <QuoteWrapper quote={this.props.quote} />
        {!this.props.multipleQuotes ? <AuthorWrapper author={this.props.author} quoteGenre={this.props.quoteGenre} getMultipleQuotes={this.props.getMultipleQuotes} /> : ''}
      </div>
    )
  }
}

const QuoteWrapper = (props) => {
  return (
    <div className="quoteWrapper">
      <h3 id="text">{props.quote}</h3>
    </div>
  )
}

const AuthorWrapper = (props) => {
  return (
    <div className="authorWrapper" onClick={props.getMultipleQuotes}>
      <div className="authorr">
        <div className="author">
          <h4 id="author">{props.author}</h4>
          <p id="quoteGenre">{props.quoteGenre}</p>
        </div>
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>

  )
}

export default App;
