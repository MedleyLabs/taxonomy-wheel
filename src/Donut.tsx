import * as React from 'react';

import {Category} from "./types";

interface DonutProps {
    categories: Category[];
    innerRadius: number;
    outerRadius: number;
    style?: React.CSSProperties;
    angleFactor?: number;
}

const Donut: React.FC<DonutProps> = ({categories, innerRadius, outerRadius, style = {}, angleFactor = outerRadius}) => {

    const centerX = outerRadius;
    const centerY = outerRadius;
    const totalAngle = 360;
    const anglePerArc = totalAngle / categories.length;

    const createArc = (index: number, category: Category) => {
        const startAngle = -90 + (index * anglePerArc) + (18 / angleFactor);
        const endAngle = -90 + ((index + 1) * anglePerArc) - (18 / angleFactor);
        const startAngleRadians = (startAngle * Math.PI) / 180;
        const endAngleRadians = (endAngle * Math.PI) / 180;
        const x1 = centerX + innerRadius * Math.cos(startAngleRadians);
        const y1 = centerY + innerRadius * Math.sin(startAngleRadians);
        const x2 = centerX + outerRadius * Math.cos(startAngleRadians);
        const y2 = centerY + outerRadius * Math.sin(startAngleRadians);
        const x3 = centerX + outerRadius * Math.cos(endAngleRadians);
        const y3 = centerY + outerRadius * Math.sin(endAngleRadians);
        const x4 = centerX + innerRadius * Math.cos(endAngleRadians);
        const y4 = centerY + innerRadius * Math.sin(endAngleRadians);
        const largeArcFlag = endAngleRadians - startAngleRadians <= Math.PI ? 0 : 1;
        const d = `M${x1},${y1} L${x2},${y2} A${outerRadius},${outerRadius} 0 ${largeArcFlag},1 ${x3},${y3} L${x4},${y4} A${innerRadius},${innerRadius} 0 ${largeArcFlag},0 ${x1},${y1} Z`;

        return (
            <path d={d} fill={category.color} onMouseOver={() => console.log(category.name)}>
                <title>{category.name}</title>
            </path>
        );
    };

    const arcs = [];
    for (let i = 0; i < categories.length; i++) {
        const arc = createArc(i, categories[i]);
        arcs.push(arc);
    }

    return (
        <svg height={outerRadius * 2} width={outerRadius * 2} style={style}>
            {arcs}
        </svg>
    );
};

export default Donut;