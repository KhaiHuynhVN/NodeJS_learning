// Đã là query parameter thì phải nằm trên urlencoded. Không nằm trên url thì đó sẽ là form data

// query parameter: req.query
// form data: req.body

// :slug thì sẽ là req.params.slug
// :id thì sẽ là req.params.id
// :whatever thì sẽ là req.params.whatever

// hành động submit của form có method = "get" thì sẽ có query parameter trên domain. Còn method = "post" thì không
// có query parameter trên domain.

// Nếu đặt name cho các element được render ra từ mảng thì name luôn phải có dấu "[]" để khi submit form thì
// cho dù chỉ có 1 element được chọn thì nó vẫn hiển thị dưới dạng array.
// Ví dụ:
/* <input class="form-check-input" name="ids[]" /> */
// {
//    action: 'delete',
//    ids: ['123456'],
// };
