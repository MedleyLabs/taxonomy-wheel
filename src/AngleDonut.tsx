import * as React from 'react';

import {Category} from "./types";

interface AngleDonutProps {
    categories: Category[];
    innerRadius: number;
    outerRadius: number;
    style?: React.CSSProperties;
    angleFactor?: number;
}

const AngleDonut: React.FC<AngleDonutProps> = ({ categories, innerRadius, outerRadius, style, angleFactor = outerRadius*2 }) => {

    const centerX = outerRadius;
    const centerY = outerRadius;

    let currentAngle = -90;

    let totalChildren = 0;
    for (let section of categories) {
        totalChildren += section.children.length;
    }

    const createArc = (category: Category) => {
        const startAngle = currentAngle + (18 / angleFactor);
        const endAngle = currentAngle + category.children.length/totalChildren*360 - (18 / angleFactor);
        currentAngle += category.children.length/totalChildren*360;
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
        return <path d={d} fill={category.color} onMouseOver={() => console.log(category.name)} />;
    };

    const arcs: JSX.Element[] = [];
    for (let i = 0; i < categories.length; i++) {
        const arc = createArc(categories[i]);
        arcs.push(arc);
    }

    return (
        <svg height={outerRadius*2} width={outerRadius*2} style={style} >
            {arcs}
        </svg>
    );
};

export default AngleDonut;
