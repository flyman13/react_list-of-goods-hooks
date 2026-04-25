import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Default = 'default',
  Alphabetical = 'alphabetical',
  Length = 'length',
  Reverse = 'reverse',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  const reverseGoods = () => {
    const temp = [...goods];

    temp.reverse();

    if (JSON.stringify(temp) === JSON.stringify(goodsFromServer)) {
      setGoods(goodsFromServer);
      setSortType(SortType.Default);
    } else {
      setGoods(temp);
      setSortType(SortType.Reverse);
    }
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortType(SortType.Default);
  };

  const sortByAlphabetical = () => {
    const temp = [...goodsFromServer];

    temp.sort((a, b) => b.localeCompare(a));
    setGoods(temp);
    setSortType(SortType.Alphabetical);
  };

  const length = () => {
    const temp = [...goodsFromServer];

    temp.sort((a, b) => {
      if (b.length !== a.length) {
        return b.length - a.length;
      }

      return b.localeCompare(a);
    });

    setGoods(temp);
    setSortType(SortType.Length);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabetical}
          className={`button is-info ${sortType === SortType.Alphabetical ? 'is-active' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={length}
          className={`button is-success ${sortType === SortType.Length ? 'is-active' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          className={`button is-warning ${sortType !== SortType.Default ? 'is-active' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortType !== SortType.Default && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
