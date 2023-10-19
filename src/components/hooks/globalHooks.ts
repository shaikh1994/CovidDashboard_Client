
export function getUniqueCountry(data: any) {
  const uniqueKeywords = Array.from(new Set(data.country));
  return uniqueKeywords;
  console.log("uniqueKeywords", uniqueKeywords)
}

export function getUniqueRegion(data: any) {
  const uniqueKeywords = Array.from(new Set(data.region));
  return uniqueKeywords;
}

export function getFilterSearchData(data: any, input: string) {
  const inputKeyword: string = input.trim();

  const filtered = {
    country: [] as string[],
    dates: [] as string[],
    region: [] as string[],
    id: [] as (null | number)[],
    confirmed: [] as number[],
    deaths: [] as number[],
    recovered: [] as number[],
    active: [] as number[],
    lat: [] as number[],
    long: [] as number[],

  };

  for (let i = 0; i < data.country.length; i++) {
    if (data.country[i].includes(inputKeyword)) {
      filtered.dates.push(data.dates[i]);
      filtered.region.push(data.region[i]);
      filtered.id.push(data.id[i]);
      filtered.confirmed.push(data.confirmed[i]);
      filtered.deaths.push(data.deaths[i]);
      filtered.recovered.push(data.recovered[i]);
      filtered.active.push(data.active[i]);
      filtered.lat.push(data.lat[i]);
      filtered.long.push(data.long[i]);
    }
  }
  return filtered;
}

export function getFilterCountry(selectedKeyword: any, data: any) {
  const filtered = {
    country: [] as string[],
    dates: [] as string[],
    region: [] as string[],
    id: [] as (null | number)[],
    confirmed: [] as number[],
    deaths: [] as number[],
    recovered: [] as number[],
    active: [] as number[],
    lat: [] as number[],
    long: [] as number[],

  };
  
  console.log("data", data)
  for (let i = 0; i < data.country.length; i++) {
    if (selectedKeyword?.some((keyword: any) => data.country[i] === keyword)) {
      filtered.country.push(data.country[i]);
      filtered.dates.push(data.dates[i]);
      filtered.region.push(data.region[i]);
      filtered.id.push(data.id[i]);
      filtered.confirmed.push(data.confirmed[i]);
      filtered.deaths.push(data.deaths[i]);
      filtered.recovered.push(data.recovered[i]);
      filtered.active.push(data.active[i]);
      filtered.lat.push(data.lat[i]);
      filtered.long.push(data.long[i]);
    }
  }
  return filtered;
}

export function getFilterDate(selectedDate: any, data: any) {
  if (!selectedDate) {
    return data;
  }
  const filtered = {
    country: [] as string[],
    dates: [] as string[],
    region: [] as string[],
    id: [] as (null | number)[],
    confirmed: [] as number[],
    deaths: [] as number[],
    recovered: [] as number[],
    active: [] as number[],
    lat: [] as number[],
    long: [] as number[],

  };

  for (let i = 0; i < data.dates.length; i++) {
    if (selectedDate?.some((dates: any) => data.dates[i].includes(dates))) {
      filtered.country.push(data.country[i]);
      filtered.dates.push(data.dates[i]);
      filtered.region.push(data.region[i]);
      filtered.id.push(data.id[i]);
      filtered.confirmed.push(data.confirmed[i]);
      filtered.deaths.push(data.deaths[i]);
      filtered.recovered.push(data.recovered[i]);
      filtered.active.push(data.active[i]);
      filtered.lat.push(data.lat[i]);
      filtered.long.push(data.long[i]);
    }
  }
  return filtered;
}


export function getFilterRegion(selectedCategory: any, data: any) {
  const filtered = {
    country: [] as string[],
    dates: [] as string[],
    region: [] as string[],
    id: [] as (null | number)[],
    confirmed: [] as number[],
    deaths: [] as number[],
    recovered: [] as number[],
    active: [] as number[],
    lat: [] as number[],
    long: [] as number[],
  };

  for (let i = 0; i < data.region.length; i++) {
    if (
      selectedCategory?.some((keyword: any) =>
        data.region[i].includes(keyword)
      )
    ) {
      filtered.country.push(data.country[i]);
      filtered.dates.push(data.dates[i]);
      filtered.region.push(data.region[i]);
      filtered.id.push(data.id[i]);
      filtered.confirmed.push(data.confirmed[i]);
      filtered.deaths.push(data.deaths[i]);
      filtered.recovered.push(data.recovered[i]);
      filtered.active.push(data.active[i]);
      filtered.lat.push(data.lat[i]);
      filtered.long.push(data.long[i]);
    }
  }
  return filtered;
}
