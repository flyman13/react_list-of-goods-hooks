import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

type SortType = '' | 'alphabetical' | 'length';

export const goodsFromServer: string[] = [
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

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = [...goodsFromServer];

  if (sortBy === 'alphabetical') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length || a.localeCompare(b));
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isOriginalOrder =
    JSON.stringify(visibleGoods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== 'alphabetical',
          })}
          onClick={() => setSortBy('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortBy('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul className="list">
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
