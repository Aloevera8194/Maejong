import { getDrawViewport, mappingToDrawPlacements } from './draw-geometry';
import type { Mapping } from './types';
import { toBase64 } from './base64';

export function generateSVG(mapping: Mapping): string {
	const items = mappingToDrawPlacements(mapping);
	const viewport = getDrawViewport(items);
	const sl: Array<string> = [
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewport}" preserveAspectRatio="xMidYMid meet" height="100%" width="100%">`
	];
	const cores = ['#FFF9E5', '#F2D58A', '#E8A857', '#D9743F', '#B84A2E'];
	for (const draw of items) {
		const cor = cores[Math.min(draw.z, cores.length - 1)];
		sl.push(`<g transform="${draw.pos.translate}"><rect fill="#000000" opacity="0.4" stroke-width="0" x="7" y="7" width="75" height="100" rx="10" ry="10"></rect><rect fill="${cor}" stroke-width="2" stroke="black" x="0" y="0" width="75" height="100" rx="10" ry="10"></rect></g>`);
	}
	sl.push('</svg>');
	return sl.join('');
}

export function generateBase64SVG(mapping: Mapping): string {
	return `data:image/svg+xml;base64,${toBase64(generateSVG(mapping))}`;
}
