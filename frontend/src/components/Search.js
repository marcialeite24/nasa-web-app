import React from "react";

export default function Search({data,onFilter,onReset}) {
    const categories = React.useMemo(() => ({
        Astronomy: ["astronomy", "cosmos", "universe", "celestial", "aurora", "night", "sky", "fog bow", "storm cloud", "arcs", "gamma-ray", "shadowset", "spiral", "clouds"],
        Planets: ["planet", "planets", "earth", "mars", "jupiter", "saturn", "venus", "neptune", "uranus", "mercury", "exoplanet", "moon"],
        Stars: ["star", "stars", "supernova", "nova", "pulsar", "black hole", "neutron star", "red giant", "sun", "equinox", "solar", "cluster"],
        Galaxies: ["galaxy", "galaxies", "milky way", "andromeda", "spiral galaxy", "elliptical galaxy", "irregular galaxy", "ngc", "sagittarius", "Messier"],
        Nebulae: ["nebula", "nebulae", "dark nebula", "planetary nebula", "reflection nebula", "seahorse", "trifid", "dark tower", "scorpious", "jones-emberson", "serpens"],
        Spacecraft: ["spacecraft", "satellite", "probe", "lander", "rover", "space station"],
        Asteroids: ["asteroid", "asteroids", "comet", "comets", "meteor", "meteoroid", "perseid"],
        Exploration: ["exploration", "mission", "launch", "discovery", "telescope", "apollo 11", "robot"]
    }), []);
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [isInitialLoad, setIsInitialLoad] = React.useState(true);

    React.useEffect(() => {
        if(!isInitialLoad) {
            sessionStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
        }
    }, [selectedCategories,isInitialLoad]);

    React.useEffect(() => {
        if(onReset) {
            setSelectedCategories([]);
            onFilter(data);
        }
    }, [data, onFilter, onReset]);

    const filterData = React.useCallback((categoriesSelected) => {
        if(!data) return;
        if(categoriesSelected.length === 0) {
            onFilter(data);
            return;
        }

        const filtered = [];
        for(const item of data) {
            for(const category of categoriesSelected) {
                for(const keyword of categories[category]) {
                    if(item.title.toLowerCase().includes(keyword) && !filtered.includes(item)) {
                        filtered.push(item);
                        break;
                    }
                }
            }
        }
        onFilter(filtered);
    }, [data,onFilter,categories]);

    const handleChange = (category) => {
        const updatedCategories = selectedCategories.includes(category) 
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
    
        setSelectedCategories(updatedCategories);
        filterData(updatedCategories);
    };

    const getAvailableCategories = () => {
        const availableCategories = new Set();
        if (!data) return [];
        data.forEach(item => {
            Object.entries(categories).forEach(([category, keywords]) => {
                keywords.forEach(keyword => {
                    if (item.title.toLowerCase().includes(keyword)) {
                        availableCategories.add(category);
                    }
                });
            });
        });
        return Array.from(availableCategories);
    };

    const availableCategories = getAvailableCategories();

    React.useEffect(() => {
        const storedFilters = JSON.parse(sessionStorage.getItem('selectedCategories'));
        if (storedFilters) {
            setSelectedCategories(storedFilters);
            filterData(storedFilters);
        }
        setIsInitialLoad(false);
    }, [filterData]);

    return (
        <div className="search-filter">
            {availableCategories.length > 0 ? (
                availableCategories.map((category, index) => (
                <label key={index}>
                    <input
                        type="checkbox"
                        onChange={() => handleChange(category)}
                        checked={selectedCategories.includes(category)}
                    />
                    {category}
                </label>
            ))) : ''}            
        </div>
    )
};