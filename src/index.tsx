import * as React from 'react';

import {Category, FlattenedTaxonomy} from "./types";
import Donut from "./Donut"
import AngleDonut from "./AngleDonut";

// import "./styles/main.css"

function flattenTaxonomyByDepth(taxonomy: Category, depth: number): FlattenedTaxonomy {
    let flattened: FlattenedTaxonomy = {1: taxonomy};

    for (let i = 2; i <= depth; i++) {
        flattened[i] = [];
        for (let child of flattened[i - 1]) {
            flattened[i] = flattened[i].concat(child.children);
        }
    }

    return flattened;
}
interface TaxonomyWheelProps {
    data: Category,
    maxDepth: number
}

const TaxonomyWheel: React.FC<TaxonomyWheelProps> = ({data, maxDepth}) => {

    console.log('DATA', data)

    let flattened: FlattenedTaxonomy = flattenTaxonomyByDepth(data, maxDepth)
    console.log('FLATTENED', flattened)

    const radius: number = 300;
    const thickness: number = radius/maxDepth;

    const layers: JSX.Element[] = [];

    for (let i: number = maxDepth; i >= 1; i--) {

        if (i === maxDepth) {
            layers.push(
                <Donut
                    categories={flattened[i]}
                    innerRadius={radius - thickness}
                    outerRadius={radius}
                    angleFactor={80}
                    style={{position: 'absolute', top: 0, left: 0}}
                />
            )
        } else {
            layers.push(
                <AngleDonut
                    categories={flattened[i]}
                    innerRadius={thickness * i - thickness}
                    outerRadius={thickness * i - 2}
                    angleFactor={50}
                    style={{position: 'absolute', top: thickness*(maxDepth-i) + 2, left: thickness*(maxDepth-i) + 2}}
                />
            )
        }
    }

    return (
        <div style={{position: 'relative'}}>
            {layers}
        </div>
    );
}

export default TaxonomyWheel;
