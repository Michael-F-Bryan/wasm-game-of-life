extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use cfg_if::cfg_if;
use std::fmt::{self, Display, Formatter};
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
#[derive(Clone, PartialEq, Eq)]
pub struct Universe {
    width: usize,
    height: usize,
    cells: Vec<Cell>,
}

impl Universe {
    pub fn live_neighbour_count(&self, x: usize, y: usize) -> usize {
        debug_assert!(x < self.width);
        debug_assert!(y < self.height);

        let mut count = 0;
        self.foreach_neighbour(x, y, |x, y| {
            let cell = self.cells[self.index_of(x, y)];
            if cell == Cell::Alive {
                count += 1;
            }
        });

        count
    }

    fn foreach_neighbour<F>(
        &self,
        centre_x: usize,
        centre_y: usize,
        mut callback: F,
    ) where
        F: FnMut(usize, usize),
    {
        let width = self.width;
        let height = self.height;

        let delta_xs = [width - 1, 0, 1];
        let delta_ys = [height - 1, 0, 1];

        for dx in delta_xs.into_iter() {
            for dy in delta_ys.iter().cloned() {
                let y = (centre_x + dy) % height;
                let x = (centre_y + dx) % width;

                if x == centre_x && y == centre_y {
                    continue;
                }

                callback(x, y);
            }
        }
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn new(width: usize, height: usize) -> Universe {
        Universe {
            width,
            height,
            cells: vec![Cell::Dead; width * height],
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn height(&self) -> usize {
        self.height
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn index_of(&self, x: usize, y: usize) -> usize {
        y * self.width + x
    }

    pub fn tick(&self) -> Universe {
        let mut next = self.clone();

        for x in 0..self.width {
            for y in 0..self.height {
                let ix = self.index_of(x, y);
                let cell = self.cells[ix];
                let live_neighbours = self.live_neighbour_count(x, y);

                next.cells[ix] = game_logic(cell, live_neighbours);
            }
        }

        next
    }

    pub fn render(&self) -> String {
        self.to_string()
    }

    pub fn set_cell(&mut self, x: usize, y: usize, alive: bool) {
        let ix = self.index_of(x, y);

        if let Some(cell) = self.cells.get_mut(ix) {
            *cell = if alive { Cell::Alive } else { Cell::Dead };
        }
    }
}

impl Display for Universe {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}

fn game_logic(current_state: Cell, live_neighbours: usize) -> Cell {
    match (current_state, live_neighbours) {
        (Cell::Alive, x) if x < 2 => Cell::Dead,
        (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
        (Cell::Alive, x) if x > 3 => Cell::Dead,
        (Cell::Dead, 3) => Cell::Alive,
        (otherwise, _) => otherwise,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn neighbours_of_central_square() {
        let universe = Universe::new(10, 10);
        let mut should_be = vec![
            (6, 4),
            (6, 5),
            (6, 6),
            (5, 4),
            (5, 6),
            (4, 4),
            (4, 5),
            (4, 6),
        ];

        let mut got = Vec::new();
        universe.foreach_neighbour(5, 5, |x, y| got.push((x, y)));

        got.sort();
        should_be.sort();
        assert_eq!(got, should_be);
    }

    #[test]
    fn neighbours_of_origin() {
        let universe = Universe::new(10, 10);
        let mut should_be = vec![
            (0, 1),
            (0, 9),
            (1, 0),
            (1, 1),
            (1, 9),
            (9, 0),
            (9, 1),
            (9, 9),
        ];

        let mut got = Vec::new();
        universe.foreach_neighbour(0, 0, |x, y| got.push((x, y)));

        got.sort();
        should_be.sort();
        assert_eq!(got, should_be);
    }

    #[test]
    fn neighbours_of_top_right() {
        let universe = Universe::new(10, 10);
        let mut should_be = vec![
            (0, 0),
            (0, 8),
            (0, 9),
            (8, 0),
            (8, 8),
            (8, 9),
            (9, 0),
            (9, 8),
        ];

        let mut got = Vec::new();
        universe.foreach_neighbour(9, 9, |x, y| got.push((x, y)));

        got.sort();
        should_be.sort();
        assert_eq!(got, should_be);
    }
}
