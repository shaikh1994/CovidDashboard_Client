import InputField from "@/components/share/InputField/InputField";
import {
  getFilterSearchData,
  getUniqueCountry,
} from "@/components/hooks/globalHooks";
import { Loader, Tabs } from "@mantine/core";
import dynamic from "next/dynamic";
import { Data } from "plotly.js";

import React, { useState, useEffect } from "react";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface TabGraphProps {
  filteredData: any;
  data: any;
  setData: (value: any) => void;
  setFilteredData: (value: any) => void;
  dataLoading: boolean;
  currTab: string;
  setCurrTab: (value: string) => void;
}

const tabValues = ["confirmed", "deaths", "recovered", "active"];

const TabGraph = ({
  data,
  filteredData,
  setFilteredData,
  dataLoading,
  currTab,
  setCurrTab,
}: TabGraphProps) => {
  const [input, setInput] = useState("");
  const [traces, setTraces] = useState<Data[]>();
  const [barTraces, setBarTraces] = useState<any>();
  const [averageTraces, setAverageTraces] = useState<any>();
  const [filteredCountry, setFilteredCountry] = useState<any>();
  const [trendTraces, setTrendTraces] = useState<any>();

  useEffect(() => {
    setFilteredCountry(getUniqueCountry(data));
  }, [filteredData]);

  useEffect(() => {
    graph();   
  }, [filteredData, filteredCountry, data, currTab]);

  
  const graph = () => {
    setTraces(
      filteredCountry?.map((keyword: any) => {
        const filteredDataByTab = filteredData?.[currTab].filter(
          (value: any, index: number) => {
            return filteredData?.country[index] === keyword;
          }
        );
        console.log("gg", currTab)
        const filteredRegion = filteredData?.region.filter(
          (value: any, index: number) => {
            return filteredData?.country[index] === keyword;
          }
        );
        return {
          x: filteredData?.dates,
          y: filteredDataByTab,
          type: "scattergl", 
          mode: "lines+markers",
          name: keyword,
          hoverinfo: "y+name+text",
          text: filteredRegion.map((region: any) => ` ${region}`),
          showlegend: true,
        };
      })
    );
  };
  
  

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilteredData(getFilterSearchData(filteredData, input));
  };

  return (
    <div className="w-full h-full">
      <Tabs value={currTab} onTabChange={(value) => setCurrTab(value)}>
        <Tabs.List>
          {tabValues.map((tabValue) => (
            <Tabs.Tab key={tabValue} value={tabValue}>
              {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} Cases
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabValues.map((tabValue) => (
          <Tabs.Panel key={tabValue} value={tabValue} className="w-full h-full" pt="xs">
            {traces && !dataLoading ? (
              <Plot
                className="w-full"
                data={traces}
                layout={{
                  title: `${tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} Cases per day of Each Country`,
                  yaxis: {
                    title: tabValue.charAt(0).toUpperCase() + tabValue.slice(1),
                    automargin: true,
                  },
                  xaxis: {
                    title: "Date",
                    automargin: true,
                  },
                  autosize: true,
                  height: 600,
                  margin: {
                    l: 10,
                    r: 10,
                    t: 30,
                    b: 20,
                  },
                  legend: {
                    font: {
                      size: 20,
                    },
                  },
                }}
                config={{
                  toImageButtonOptions: {
                    format: "svg",
                    width: 1900,
                    height: 1000,
                  },
                }}
              />
            ) : (
              <Loader />
            )}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabGraph;
