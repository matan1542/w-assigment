import React, { useState, useEffect, useMemo, useCallback } from 'react';
import WixBtn from './WixBtn';
import style from './style.module.scss';
import { MAX_CLICKED_ITEMS_COUNT, MIN_CLICKED_ITEMS_COUNT } from '@/constants';

const Wix = ({ data }) => {
  const [remainingData, setRemainingData] = useState(null);
  const [selectedCountryCapital, setSelectedCountryCapital] = useState({
    country: { name: '', idx: -1 },
    capital: { name: '', idx: -1 },
  });
  const [clickedItems, setClickedItems] = useState([]);

  const btnStyle = useCallback(
    (idx) => {
      if (!clickedItems.length) return null;
      if (clickedItems.length === 1 && clickedItems[0] === idx) {
        return style.selectedOneBtn;
      } else if (clickedItems[0] === idx || clickedItems[1] === idx) {
        return style.wrongChoice;
      }
    },
    [clickedItems]
  );

  useEffect(() => {
    const normalizedDataCountries = [
      ...Object.keys(data),
      ...Object.values(data),
    ];
    setRemainingData(normalizedDataCountries.sort(() => Math.random() - 0.5));
  }, [data]);

  const handleCountryClick = (countryCapital) => {
    if (clickedItems.includes(countryCapital.idx)) return;

    let modifiedCountryCapital = handleSelectedCountryCapital(countryCapital);
    let newClickedItems = [...clickedItems, countryCapital.idx];
    let isMatch = checkMatch(modifiedCountryCapital);

    if (newClickedItems.length === MIN_CLICKED_ITEMS_COUNT) {
      if (!isMatch) {
        modifiedCountryCapital = {
          country: { name: '', idx: -1 },
          capital: { name: '', idx: -1 },
        };
      } else {
        newClickedItems = [];
      }
    } else if (newClickedItems.length === MAX_CLICKED_ITEMS_COUNT && !isMatch) {
      newClickedItems = [countryCapital.idx];
    }

    setSelectedCountryCapital(modifiedCountryCapital);
    setClickedItems(newClickedItems);
  };

  const handleSelectedCountryCapital = (countryCapital) => {
    let capital = !data[countryCapital.name]
      ? countryCapital
      : selectedCountryCapital.capital;

    let country = data[countryCapital.name]
      ? countryCapital
      : selectedCountryCapital.country;

    return { country, capital };
  };

  const checkMatch = (countryCapital) => {
    const { country, capital } = countryCapital;
    if (data[country.name] && data[country.name] === capital.name) {
      const countries = removeSelectedCountryCapital(countryCapital, [
        ...remainingData,
      ]);
      setRemainingData(countries);
      setSelectedCountryCapital({
        country: { name: '', idx: -1 },
        capital: { name: '', idx: -1 },
      });
      return true;
    }
    return false;
  };

  const removeSelectedCountryCapital = (countryCapital, remainingData) => {
    const { country, capital } = countryCapital;
    const updatedData = remainingData.filter((item) => {
      return item !== country.name && item !== capital.name;
    });
    return updatedData;
  };

  if (!remainingData) return <div>Loading...</div>;
  if (!remainingData.length) return <div>Congratulations!</div>;

  return (
    <div>
      <div className={style.btnsContainer}>
        {remainingData.map((countryCapital, idx) => (
          <WixBtn
            key={idx}
            callback={handleCountryClick}
            idx={idx}
            classname={btnStyle(idx)}
            value={countryCapital}
          />
        ))}
      </div>
    </div>
  );
};

export default Wix;
