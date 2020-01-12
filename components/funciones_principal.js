import React from 'react';
import { categoriasAll, subcategoria } from '../components/categorias';

export function Categorias(state) {
    if (state.level === null) {
        return categoriasAll(state)
    } else if (state.level.sublevels !== undefined) {
        return subcategoria(state);
    }
}

