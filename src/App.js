import SearchForm from './components/Search/searchForm.js';
import CitiesTable from './components/Cities/citiesTable.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
        Weather in your city.
        </h1>
      </header>
      <main>
        <SearchForm />
        <CitiesTable />
      </main>
    </div>
  );
}

export default App;
