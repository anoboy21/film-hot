import React, { FC, Fragment, useState } from "react";
import { SearchConfig } from "../../shared/types";
import ExploreResult from "./ExploreResult";

interface ExploreConfigProps {
  config: SearchConfig;
  sectionIndex: number;
}

const ExploreConfig: FC<ExploreConfigProps> = ({ config, sectionIndex }) => {
  const initConfig: { [key: string]: string } = {};
  const [configs, setConfigs] = useState(
    config.screeningItems.reduce((acc, current) => {
      acc[current.items[0].screeningType] = current.items[0].params;
      return acc;
    }, initConfig)
  );

  const configChangeHandler = (name: any, value: any) => {
    const clone = JSON.parse(JSON.stringify(configs));

    clone[name] = value;
    setConfigs(clone);
  };

  return (
    <Fragment>
      <div className="flex flex-wrap gap-3 my-6">
        {config.screeningItems.map((section, index) => (
          <select
            className="outline-none bg-dark-lighten px-3 py-2 rounded"
            key={index}
            value={configs[section.items[0].screeningType]}
            onChange={(e) =>
              configChangeHandler(
                section.items[0].screeningType,
                e.target.value
              )
            }
          >
            {section.items.map((selection) => (
              <option
                className="outline-none bg-dark-lighten px-3 py-2"
                key={selection.params}
                value={selection.params}
              >
                {selection.name}
              </option>
            ))}
          </select>
        ))}
      </div>
      <ExploreResult
        params={config.params}
        configs={configs}
        sectionIndex={sectionIndex}
      />
    </Fragment>
  );
};

export default ExploreConfig;
