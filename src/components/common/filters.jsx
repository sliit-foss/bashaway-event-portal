import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Dropdown, Input } from "@/components";
import { computeFilterQuery } from "@/filters";

const Filters = ({ filters, setFilterQuery }) => {
  const [filtersLocalState, setFiltersLocalState] = useState(filters);

  useEffect(() => {
    setFilterQuery(computeFilterQuery(filters));
  }, [filtersLocalState]);

  const onFilterChange = (e) => {
    setFiltersLocalState(
      filtersLocalState.map((filter) => {
        if (filter.key === e.target.name) filter.value = e.target.value;
        return filter;
      })
    );
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-start items-center gap-6">
      {filtersLocalState.map((filter, index) => {
        return (
          <div
            key={`filter-${filter.key}-${index}`}
            className="w-full md:w-1/2 h-full flex flex-col justify-center items-start"
          >
            {filter.options ? (
              <Dropdown
                variant="secondary"
                label={filter.label}
                filterkey={filter.key}
                options={filter.options}
                className="h-12 sm:h-14 font-medium text-black/70"
                onChange={onFilterChange}
              />
            ) : (
              <Input
                variant="secondary"
                className="h-12 sm:h-14 font-medium"
                value={filter.value}
                placeholder={`Search by ${filter.label?.toLowerCase()}`}
                name={filter.key}
                onChange={(e) => {
                  onFilterChange(e);
                }}
                prefixIcon={<SearchIcon size={20} className="text-black/50" />}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
