import { BoundingRectangle } from "./bounding-rectangle.model"
import { Edges } from "./edges.model"

export interface ResizeEvent {
  rectangle: BoundingRectangle
  edges: Edges
}