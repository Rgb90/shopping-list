import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import styled from 'styled-components';
import { nanoid } from "nanoid";
import Table from 'react-bootstrap/Table';
import IconButton from './IconButton';
import Fuse from 'fuse.js';

const shops = [
  { id: 1, name: 'Teknosa' },
  { id: 2, name: 'Civil' },
  { id: 3, name: 'File' },
  { id: 4, name: 'Tarım Kredi Koop.' },
  { id: 5, name: 'BIM' }
];

const categories = [
  { id: 1, name: 'Oyuncak' },
  { id: 2, name: 'Şarküteri' },
  { id: 3, name: 'Teknoloji' },
  { id: 4, name: 'Fırın' },
  { id: 5, name: 'Bakliyat' },
  { id: 6, name: 'Süt Ürünleri' }
];

// "1. Kategori ve Marketten oluşan iki obje array oluştur

const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: end;
gap: 12px;
padding: 24px;
`
// 2. Form input’lar aracılığıyla kullanıcıdan yeni ürün bilgisi alacağız, 
//ardından girilen o ürünleri bir “products” state’ine kaydedeceğiz
export function ShoppingList() {
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");

  const [selectedShop, setSelectedShop] = useState(shops[0].id);

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const [filterShop, setFilterShop] = useState(null); //x

  const [filterCategory, setFilterCategory] = useState("all");

  const [filterIsbought, setFilterIsbought] = useState("all"); //<

  const [filterProductName, setFilterProductName] = useState("");

  const filteredProducts = products.filter((product) => {
    let result = true; // Ürüne gözükebilirsin dedik önce

    // 4 filtre var. hepsi aynı anda olmayacağı için aşama aşama gidiyoruz.
    // önce;

    // Isbought 
    let myProductBought = product.isBought;
    if (filterIsbought === true) {
      result = result && myProductBought === true;
    }
    if (filterIsbought === false) {
      result = result && myProductBought !== true;
    }


    // name
    if (filterProductName !== "") {
      const fuse = new Fuse(products, { keys: ["name"] });
      const isIncluded = fuse.search(filterProductName).find((p) => p.item.id === product.id);
      result = result && isIncluded;
    }


    //Shop
    if (filterShop !== "all") {
      const isIncluded = product.shop == filterShop;
      result = result && isIncluded;
    }


    // Category
    if (filterCategory !== "all") {
      const isIncluded = product.category == filterCategory;
      result = result && isIncluded;
    }

    return result;

  });

  return (
    <>
      <h2>Ürün Ekle</h2>
      <Form>
        <Wrapper>
          <Form.Control
            aria-label='Small'
            aria-description='inputGroup-sizing-sm'
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            value={productName}
          />
          <Form.Select
            style={{ width: "25%" }}
            aria-label="Default select example"
            value={selectedShop}
            onChange={(e) => {
              setSelectedShop(e.target.value);
            }}>
            <option>Market seçiniz</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name} {/* 4. Bu listeleri select input’unun içine basarken ilgili array’imizden döngüyle basalım, manuel girmeyelim. Yani map ile */}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            style={{ width: "25%" }}
            aria-label="Default select example"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}>
            <option>Kategori seçiniz</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}> {/* 5. Döngü olarak basarken option’ların “value” kısmına 
              kategorinin veya marketin id’sini basalım.Böylece seçtiğimizde id’yi seçmiş olacağız */}
                {category.name}
              </option>
            ))}
          </Form.Select>

          {/* 3. Butonun üzerinde Ürünün adını yazdığımız bir yazı kutucuğu,
           Ürünün hangi marketten alınacağını seçtiğimiz bir select input’u,
           Ürünün kategorisini seçtiğimiz bir select input’u olacak
           */}

          {/*  <Form.Control
            aria-label='Small'
            aria-description='inputGroup-sizing-sm'
            onChange={(e) => {
              setFilterProductName(e.target.value);
            }}
            value={filterProductName}
          /> */}
          <Button
            onClick={() => {
              const product = {
                name: productName,
                category: selectedCategory,
                shop: selectedShop,
                id: nanoid(), /* Eklediğimiz her bir ürünün ek olarak otomatik oluşturulan rastgele bir id’si olsun
                Yani ürünün adı (name), hangi marketten alınacağı (shop) ve kategorisinin(category) yanında bir de 
                id’si olsun“products” state’inde array içerisine kaydederken name, shop ve category bilgilerinin 
                yanında bu id ile beraber kaydedeceğiz */ //Burayı anlamadım. products state ne nasıl kaydettik?
              };
              setProducts([...products, product]);
            }}
            variant='success'
            style={{ width: "25%" }}>
            Ekle</Button>
        </Wrapper>
        <h2>Ürün Filtrele</h2>
        <Wrapper>
          <div key={"default-radio"} className='mb-3'>
            <Form.Check
              type={'radio'}
              id={'default-radio-2'}
              label={"tümü"}
              name="isbought"
              checked={filterIsbought === null}
              onClick={() => {
                setFilterIsbought(null)
              }}
            />
            <Form.Check
              type={'radio'}
              id={'default-radio'}
              label={"satın alınanlar"}
              name="isbought"
              checked={filterIsbought === true}
              onClick={() => {
                setFilterIsbought(true)
              }}
            />
            <Form.Check
              type={'radio'}
              id={'default-radio-2'}
              label={"satın alınmayanlar"}
              name="isbought"
              checked={filterIsbought === false}
              onClick={() => {
                setFilterIsbought(false)
              }}
            />
          </div>
          <Form.Select
            style={{ width: "25%" }}
            aria-label="Default select example"
            value={filterShop}
            onChange={(e) => {
              setFilterShop(e.target.value);
            }}>
            <option value={"all"}>Tümü</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            style={{ width: "25%" }}
            aria-label="Default select example"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
            }}>
            <option value={"all"}>Tümü</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control
            aria-label='Small'
            aria-description='inputGroup-sizing-sm'
            onChange={(e) => {
              setFilterProductName(e.target.value);
            }}
            value={filterProductName}
          />

        </Wrapper>
      </Form>
      <h2>Ürün Listele</h2>
      <div className='px-4'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ürün İsmi</th>
              <th>Ürün Dükkanı</th>
              <th>Ürün Kategori</th>
              <th>Ürün Sil</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => ( /* Veri olarak “products” state’indeki array’i tablo oluşturmak için kullanalım.
             “products.map(product ⇒ ......)” yaparak tablonun satırlarını teker teker oluşturacağız */
              <tr
                style={{
                  textDecoration: product.isBought ? "line-through" : "unset",
                }} /* Ürünün üstüne tıklayınca satın alındı olarak işaretleyelim. Satıra onClick verip hangi 
              satırdaki ürüne tıklandıysa o ürüne “isBought: true”tarzı bir değer eklememiz lazım 
              “products” state’imizde Satın alındı olarak işaretlenince ürünün yazısının üstü çizilsin
              Yani o satırı temsil eden üründe “isBought” değeri true ise css ile satırın yazılarının üstünü çizelim */
                onClick={() => {
                  let copyProducts = [...products];
                  copyProducts = copyProducts.map((copyProduct) => {
                    if (copyProduct.id === product.id) {
                      copyProduct.isBought =
                        copyProduct.isBought === true ? false : true;
                    }
                    return copyProduct;
                  });
                  if (
                    copyProducts.every((product) => product.isBought === true)
                  ) {
                    alert("Alışveriş tamamlandı");
                  }
                  /* React’ta state’i güncellerken setState yaptığımız fonksiyonun içinde o state’in önceki haline erişebiliyorduk.
                  Bunu kullanarak önceki hali güncellemeden hemen önce (state’in güncellenmesi için return etmeden hemen önce) 
                  alışverişin tamamlanması koşulu uyuyorsa alert patlatabiliriz */
                  setProducts(copyProducts); //güncelleme burası//
                }}
                key={product.id}>
                <td>{product.name}</td>
                <td>{shops.find((shop) => shop.id == product.shop)?.name}</td>
                <td>{categories.find((category) => category.id == product.category)?.name}</td>
                <td
                  onClick={(e) => {
                    e.stopPropagation();  //bu parent'ının haberi olmaması, sadece ona etki etmesi demek. 
                    const filteredProducts = products.filter(
                      (currentProduct) => currentProduct.id !== product.id  //id'si eşit olmayanlardan yeni bir array üretmek. yani id'si eşit olan silinsin.
                    );
                    /* Ürünü products state’inden silmek için, hangi ürünü silmek istiyorsak o ürünün id’sini 
                  products.filter yaparak elemeliyiz ve çıkan yeni array’i products state’ine tekrar kaydetmeliyiz */
                    setProducts(filteredProducts);
                  }}
                  className='text-center'>
                  <IconButton />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};