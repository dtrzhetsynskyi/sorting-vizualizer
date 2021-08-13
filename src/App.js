import { connect } from 'react-redux';
import {setNumbersArray, generateRandomNumbersArray} from './state/numbersSlice';
import {updateStatistics} from './state/statisticsSlice';

import { getInsertionSortAnimations } from './algorithms/InsertionSort';
import {getSelectionSortAnimations} from './algorithms/SelectionSort';
import { getShellSortAnimations } from './algorithms/ShellSort';
import { getMergeSortAnimations } from './algorithms/MergeSort';
import { getQuickSortAnimations } from './algorithms/quickSort';

import { Bar } from './Bar';
import { shuffle } from './functions/shuffle';
import { SETTINGS } from './settings/settings';

function App({ updateStatistics, setNumbersArray, generateRandomNumbersArray, numbers, statistics }) {
  function resetBarsColor() {
    for (let i = 0; i < numbers.length; i++) {
      document.querySelector(`#bar-${i}`).style.color = SETTINGS.defaultColor;
    }
  }

  function setButtonsState(state) {
    const controlls = document.querySelectorAll('.controll');
    [...controlls].map((item) => (item.disabled = state));
  }

  async function sort(alg) {
    updateStatistics({ comparisons: 0, acesses: 0 });
    setButtonsState(true);
    if (alg === 'selection') {
      await getSelectionSortAnimations();
    } else if (alg === 'insertion') {
      await getInsertionSortAnimations();
    } else if (alg === 'shell') {
      await getShellSortAnimations();
    } else if (alg === 'merge') {
      await getMergeSortAnimations();
    } else if (alg === 'quick') {
      await getQuickSortAnimations();
    }
    setButtonsState(false);
    resetBarsColor();
  }

  function shuffleNumbers() {
    setNumbersArray(shuffle(numbers));
  }

  return (
    <>
      <div className="bars">
        {numbers.map((item, id) => {
          return <Bar height={item} key={id} id={id}></Bar>;
        })}
      </div>

      <div className="controlls-wrapper">
        <div className="controlls">
          <div className="logo">
            <img src="./img/logo.svg" alt="Sorting visualizer"/>
          </div>
          <div className="statistics">
            <p className="statistics-comparisons">{statistics.comparisons} comparisons</p>
            <p className="statistics-acesses">{statistics.acesses} array acesses</p>
          </div>
          <button
            className="controll"
            onClick={() => {
              generateRandomNumbersArray();
              updateStatistics({ comparisons: 0, acesses: 0 });
            }}
          >
            Generate new array
          </button>
          <button className="controll" onClick={() => {
            shuffleNumbers();
            updateStatistics({ comparisons: 0, acesses: 0 });
          }}>
            Shuffle
          </button>
          <button className="controll" onClick={() => sort('selection')}>
            Selection sort
          </button>
          <button className="controll" onClick={() => sort('insertion')}>
            Insertion sort
          </button>
          <button className="controll" onClick={() => sort('shell')}>
            Shell sort
          </button>
          <button className="controll" onClick={() => sort('merge')}>
            Merge sort
          </button>
          <button className="controll" onClick={() => sort('quick')}>
            Quick sort
          </button>
        </div>
      </div>
    </>
  );
}

const mapDispatch = { updateStatistics, setNumbersArray, generateRandomNumbersArray };
const mapStateToProps = ({ statistics, numbers, animation }) => ({statistics, numbers, animation}); 
export default connect(mapStateToProps, mapDispatch)(App);
