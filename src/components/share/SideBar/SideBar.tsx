import DateRangePicker from "@/components/share/DateRangerPicker/DateRangerPicker";
import {
  getFilterRegion,
  getFilterCountry,
  // getFilterKeywords,
  getUniqueRegion,
  getUniqueCountry,
  getFilterDate,
  // getUniqueKeywords,
} from "@/components/hooks/globalHooks";
import { Button, Checkbox, Divider, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getDateArray } from "@/libs/date";
import MultiSelectDropdown from "../MultiSelctDropdown/MultiSelectDropdown";

interface SideBarProps {
  data: any;
  setFilteredData: (value: any) => void;
  filteredData: any;
  // showAverage: boolean;
  // setShowAverage: (value: boolean) => void;
  currTab: string;
}

const SideBar = ({
  data,
  setFilteredData,
  filteredData,
  // showAverage,
  // setShowAverage,
  currTab,
}: SideBarProps) => {
  // const [selectedKeyword, setSelectedKeyword] = useState<string[] | []>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[] | []>([]);
  const [selectedRegion, setSelectedRegion] = useState<string[] | []>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>();
  // const allKeywords = getUniqueKeywords(data);
  const allCountry = getUniqueCountry(data);
  const allRegion = getUniqueRegion(data);

  useEffect(() => {
    // setSelectedKeyword(getUniqueKeywords(filteredData) as string[]);
    setSelectedCountry(getUniqueCountry(filteredData) as string[]);
    setSelectedRegion(getUniqueRegion(filteredData) as string[]);
  }, [filteredData]);

  const handleDateChange = (dates: any) => {
    console.log(dates);
    if (dates.length === 2) {
      setSelectedDates(getDateArray(dates));
    }
  };

  const submit = (e: any) => {
    e.preventDefault();
    const filteredDateDate = getFilterDate(selectedDates, data);
    const getFilteredCountries = getFilterCountry(
      selectedCountry,
      filteredDateDate
    );
    // console.log("getFilteredCountries",getFilteredCountries )
    const getFilterRegions = getFilterRegion(
      selectedRegion,
      getFilteredCountries
    );
    setFilteredData(getFilteredCountries);
  };

  return (
    <div className="w-64 flex-shrink-0 space-y-2 ">
      <MultiSelectDropdown
        label="Country"
        placeholder="Pick any Country"
        value={selectedCountry}
        allData={allCountry}
        setSelectedValue={setSelectedCountry}
      />
      {/* {selectedCountry && (
        <MultiSelectDropdown
          label="Country"
          placeholder="Pick any Keyword"
          value={selectedCountry}
          allData={allCountries}
          setSelectedValue={setSelectedCountry}
        />
      )} */}
      {/* {selectedCountry && (
        <MultiSelectDropdown
          label="Region"
          placeholder="Pick any Region"
          value={selectedRegion}
          allData={allRegion}
          setSelectedValue={setSelectedRegion}
        />
      )} */}
      <DateRangePicker
        label={
          <div className="flex w-full justify-between">
            <span>Date</span>
          </div>
        }
        placeholder="Select Date Range"
        classNames={{ label: "w-full" }}
        onChange={handleDateChange}
      />
      <Divider />
      <Button
        className="w-full py-3"
        placeholder="Select Dates"
        variant="outline"
        onClick={submit}
      >
        Submit
      </Button>
      <Divider />
      {/* {currTab === "scatter" && (
        <div>
          <Divider />
          <Text>Conputational Value Filters</Text>
          <Checkbox
            label="Show Averages"
            onChange={() => setShowAverage(!showAverage)}
          />
        </div>
      )} */}
    </div>
  );
};

export default SideBar;
