import "./styles.css";
import { use, useState } from "react";
import { BadgeDollarSign, PackageSearch, Tag, NotepadText } from "lucide-react";
function Header() {
  return (
    <header className="header">
      <h1 className="big-text">Create Product</h1>
      <p className="small-text">Add items to your inventory</p>
    </header>
  );
}

function Form() {
  // setting up state
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});

  // loading state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // error validations
    const err = {};
    if (!name) {
      err.name = "Product name is required";
    }
    if (!category) {
      err.category = "Category is required";
    }
    if (!price) {
      err.price = "Price is required";
    }
    if (!description) {
      err.description = "Product description is required";
    }
    setErrors(err);

    if (Object.keys(err).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.oluwasetemi.dev/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: parseFloat(price),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a product!");
      }
      const data = await response.json();
      console.log("API response:", data);
      alert("Product created successfully");
      setName(""), setPrice(""), setCategory(""), setDescription("");
    } catch (error) {
      console.error("API error:", data);
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="" method="post" className="form" onSubmit={handleSubmit}>
      <div className="gen">
        <p className="title">Category</p>
        <div className="relative">
          <div className="icon">
            <Tag size={16} stroke="rgb(83, 83, 83)" />
          </div>
          <select
            name=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="dropdown"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Garden</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <p className="error">{errors.category}</p>
      </div>

      <div className="gen">
        <label htmlFor="product-name" className="title">
          Product Name
        </label>
        <div className="relative">
          <div className="icon">
            <PackageSearch size={16} stroke="rgb(83, 83, 83)" />
          </div>
          <input
            type="text"
            name="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Leather wallet"
            className="product-name"
          />
        </div>

        {/* {errors.name && <p>{errors.name}</p>} */}
        <p className="error">{errors.name}</p>
      </div>
      <div className="gen">
        <label htmlFor="price" className="title">
          Price
        </label>
        <div className="relative">
          <div className="icon">
            <BadgeDollarSign size={16} stroke="rgb(83, 82, 83)" />
          </div>
          <input
            type="number"
            name="price"
            value={price}
            placeholder="0.00"
            onChange={(e) => setPrice(e.target.value)}
            className="price"
          />
        </div>

        <p className="error">{errors.price}</p>
      </div>
      <div className="gen">
        <p className="title">Description</p>
        <div className="relative">
          <div className="icon">
            <NotepadText size={16} stroke="rgb(83, 83, 83)" />
          </div>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product..."
            className="description"
          ></textarea>
        </div>

        <p className="error">{errors.description}</p>
      </div>
      <button type="submit" className="btn-submit">
        {loading ? "Creating" : "Create Product"}
      </button>
    </form>
  );
}

export default function App() {
  return (
    <div className="App">
      <Header />
      <Form />
    </div>
  );
}
