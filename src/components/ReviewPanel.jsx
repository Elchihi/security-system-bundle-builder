import { buildSelectedItems } from '../utils/bundle'
import ReviewItem from './ReviewItem'
import './ReviewPanel.css'

function ReviewPanel({
  products,
  quantities,
  onQuantityChange,
}) {
  const selectedItems = buildSelectedItems(
    products,
    quantities,
  )

  const cameraItems = selectedItems.filter(
    (item) => item.category === 'cameras',
  )

  return (
    <aside
      className="review-panel"
      aria-labelledby="review-panel-title"
    >
      <h2 id="review-panel-title">
        Your security system
      </h2>

      {cameraItems.length > 0 ? (
        <section
          className="review-panel__section"
          aria-labelledby="camera-review-title"
        >
          <h3
            id="camera-review-title"
            className="review-panel__section-title"
          >
            Cameras
          </h3>

          <div className="review-panel__items">
            {cameraItems.map((item) => (
              <ReviewItem
                key={item.key}
                item={item}
                onQuantityChange={onQuantityChange}
              />
            ))}
          </div>
        </section>
      ) : (
        <p className="review-panel__empty">
          Your selected cameras will appear here.
        </p>
      )}
    </aside>
  )
}

export default ReviewPanel