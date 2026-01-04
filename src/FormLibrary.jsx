import "./styles.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // loading state
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);

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
    <form method="post" className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="gen">
        <p className="title">Category</p>
        <select
          {...register("category", {
            required: "Category is required",
          })}
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
        <p className="error">{errors.category?.message}</p>
      </div>

      <div className="gen">
        <label htmlFor="product-name" className="title">
          Product Name
        </label>
        <input
          type="text"
          {...register("name", {
            required: "Product name is required",
          })}
          placeholder="Leather wallet"
          className="product-name"
        />
        {/* {errors.name && <p>{errors.name}</p>} */}
        <p className="error">{errors.name?.message}</p>
      </div>
      <div className="gen">
        <label htmlFor="price" className="title">
          Price
        </label>
        <input
          type="number"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
          placeholder="0.00"
          className="price"
        />
        <p className="error">{errors.price?.message}</p>
      </div>
      <div className="gen">
        <p className="title">Description</p>
        <textarea
          {...register("description", {
            required: "Description is required",
          })}
          placeholder="Describe your product..."
          className="description"
        ></textarea>
        <p className="error">{errors.description?.message}</p>
      </div>
      <button type="submit" className="btn-submit">
        {loading ? "Creating" : "Create Product"}
      </button>
    </form>
  );
}
function FormLibrary() {
  return (
    <div className="App">
      <Header />
      <Form />
    </div>
  );
}

export default FormLibrary;
