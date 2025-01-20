# Meal API Spec

## Create Meal API

Endpoint : POST /api/meals

Headers :
- Authorization : Token

Request Body :
```json
{
    "meal": "Apple Frangipan Tart",
    "Category": "Dessert",
    "Instructions": "Panaskan oven hingga 200C/180C Kipas/Gas 6.\r\nMasukkan biskuit ke dalam kantong freezer besar yang dapat ditutup kembali dan haluskan dengan rolling pin hingga menjadi remah-remah halus. Lelehkan mentega dalam wajan kecil, lalu tambahkan remah biskuit dan aduk hingga terlapisi mentega. Masukkan ke dalam loyang tart dan, dengan menggunakan bagian belakang sendok, tekan bagian dasar dan sisi loyang agar lapisannya rata. Dinginkan di lemari es Anda yang membuat isiannya.\r\nKrimkan mentega dan gula hingga lembut dan mengembang. Anda bisa melakukannya dalam food processor jika ada. Proses selama 2-3 menit ekstrak almond dan aduk hingga tercampur rata.\r\nKupas apel, dan potong tipis-tipis apel. Lakukan ini di menit terakhir agar apel tidak berubah warna menjadi coklat Ratakan permukaannya dan taburi almond yang sudah dipipihkan.\r\nPanggang selama 20-25 menit hingga berwarna cokelat keemasan dan matang.\r\nKeluarkan dari oven dan biarkan dingin selama 15 menit. Lepaskan sisi-sisi loyang. Cara mudah untuk melakukannya adalah dengan meletakkan loyang di atas kaleng berisi kacang-kacangan dan menekan tepi loyang secara perlahan.\r\nPindahkan kue tart, yang alasnya sudah terpasang, ke piring saji. Sajikan hangat dengan krim, crème fraiche, atau es krim.",

}
```

Response Body Success :
```json
{
    "data" : {
        "id" : 1,
        "meal": "Apple Frangipan Tart",
        "DrinkAlternate": "null",
        "Category": "Dessert",
        "Instructions": "Panaskan oven hingga 200C/180C Kipas/Gas 6.\r\nMasukkan biskuit ke dalam kantong freezer besar yang dapat ditutup kembali dan haluskan dengan rolling pin hingga menjadi remah-remah halus. Lelehkan mentega dalam wajan kecil, lalu tambahkan remah biskuit dan aduk hingga terlapisi mentega. Masukkan ke dalam loyang tart dan, dengan menggunakan bagian belakang sendok, tekan bagian dasar dan sisi loyang agar lapisannya rata. Dinginkan di lemari es Anda yang membuat isiannya.\r\nKrimkan mentega dan gula hingga lembut dan mengembang. Anda bisa melakukannya dalam food processor jika ada. Proses selama 2-3 menit ekstrak almond dan aduk hingga tercampur rata.\r\nKupas apel, dan potong tipis-tipis apel. Lakukan ini di menit terakhir agar apel tidak berubah warna menjadi coklat Ratakan permukaannya dan taburi almond yang sudah dipipihkan.\r\nPanggang selama 20-25 menit hingga berwarna cokelat keemasan dan matang.\r\nKeluarkan dari oven dan biarkan dingin selama 15 menit. Lepaskan sisi-sisi loyang. Cara mudah untuk melakukannya adalah dengan meletakkan loyang di atas kaleng berisi kacang-kacangan dan menekan tepi loyang secara perlahan.\r\nPindahkan kue tart, yang alasnya sudah terpasang, ke piring saji. Sajikan hangat dengan krim, crème fraiche, atau es krim."
    }
}
```

Response Body Error :
```json
{
    "errors" : "not valid format"
}
```
## Update Meal API

Endpoint : PUT /api/meals/:id

Headers :
- Authorization : Token

Request Body :
```json
{
    "meal": "Apple Frangipan Tart",
    "DrinkAlternate": "null",
    "Category": "Dessert",
    "Instructions": "Panaskan oven hingga 200C/180C Kipas/Gas 6.\r\nMasukkan biskuit ke dalam kantong freezer besar yang dapat ditutup kembali dan haluskan dengan rolling pin hingga menjadi remah-remah halus. Lelehkan mentega dalam wajan kecil, lalu tambahkan remah biskuit dan aduk hingga terlapisi mentega. Masukkan ke dalam loyang tart dan, dengan menggunakan bagian belakang sendok, tekan bagian dasar dan sisi loyang agar lapisannya rata. Dinginkan di lemari es Anda yang membuat isiannya.\r\nKrimkan mentega dan gula hingga lembut dan mengembang. Anda bisa melakukannya dalam food processor jika ada. Proses selama 2-3 menit ekstrak almond dan aduk hingga tercampur rata.\r\nKupas apel, dan potong tipis-tipis apel. Lakukan ini di menit terakhir agar apel tidak berubah warna menjadi coklat Ratakan permukaannya dan taburi almond yang sudah dipipihkan.\r\nPanggang selama 20-25 menit hingga berwarna cokelat keemasan dan matang.\r\nKeluarkan dari oven dan biarkan dingin selama 15 menit. Lepaskan sisi-sisi loyang. Cara mudah untuk melakukannya adalah dengan meletakkan loyang di atas kaleng berisi kacang-kacangan dan menekan tepi loyang secara perlahan.\r\nPindahkan kue tart, yang alasnya sudah terpasang, ke piring saji. Sajikan hangat dengan krim, crème fraiche, atau es krim.",
}
```

Response Body Success :
```json
{
      "data" : {
        "id" : 1,
        "meal": "Apple Frangipan Tart",
        "DrinkAlternate": "null",
        "Category": "Dessert",
        "Instructions": "Panaskan oven hingga 200C/180C Kipas/Gas 6.\r\nMasukkan biskuit ke dalam kantong freezer besar yang dapat ditutup kembali dan haluskan dengan rolling pin hingga menjadi remah-remah halus. Lelehkan mentega dalam wajan kecil, lalu tambahkan remah biskuit dan aduk hingga terlapisi mentega. Masukkan ke dalam loyang tart dan, dengan menggunakan bagian belakang sendok, tekan bagian dasar dan sisi loyang agar lapisannya rata. Dinginkan di lemari es Anda yang membuat isiannya.\r\nKrimkan mentega dan gula hingga lembut dan mengembang. Anda bisa melakukannya dalam food processor jika ada. Proses selama 2-3 menit ekstrak almond dan aduk hingga tercampur rata.\r\nKupas apel, dan potong tipis-tipis apel. Lakukan ini di menit terakhir agar apel tidak berubah warna menjadi coklat Ratakan permukaannya dan taburi almond yang sudah dipipihkan.\r\nPanggang selama 20-25 menit hingga berwarna cokelat keemasan dan matang.\r\nKeluarkan dari oven dan biarkan dingin selama 15 menit. Lepaskan sisi-sisi loyang. Cara mudah untuk melakukannya adalah dengan meletakkan loyang di atas kaleng berisi kacang-kacangan dan menekan tepi loyang secara perlahan.\r\nPindahkan kue tart, yang alasnya sudah terpasang, ke piring saji. Sajikan hangat dengan krim, crème fraiche, atau es krim.",
    }
}
```

Response Body Error :
```json
{
    "errors" : "valid format"
    
}
```

## Get Meal API

Endpoint : GET /api/meals/:id

Headers :
- Authorization : Token


Response Body Success :
```json
{
      "data" : {
        "id" : 1,
        "meal": "Apple Frangipan Tart",
        "DrinkAlternate": "null",
        "Category": "Dessert",
        "Instructions": "Panaskan oven hingga 200C/180C Kipas/Gas 6.\r\nMasukkan biskuit ke dalam kantong freezer besar yang dapat ditutup kembali dan haluskan dengan rolling pin hingga menjadi remah-remah halus. Lelehkan mentega dalam wajan kecil, lalu tambahkan remah biskuit dan aduk hingga terlapisi mentega. Masukkan ke dalam loyang tart dan, dengan menggunakan bagian belakang sendok, tekan bagian dasar dan sisi loyang agar lapisannya rata. Dinginkan di lemari es Anda yang membuat isiannya.\r\nKrimkan mentega dan gula hingga lembut dan mengembang. Anda bisa melakukannya dalam food processor jika ada. Proses selama 2-3 menit ekstrak almond dan aduk hingga tercampur rata.\r\nKupas apel, dan potong tipis-tipis apel. Lakukan ini di menit terakhir agar apel tidak berubah warna menjadi coklat Ratakan permukaannya dan taburi almond yang sudah dipipihkan.\r\nPanggang selama 20-25 menit hingga berwarna cokelat keemasan dan matang.\r\nKeluarkan dari oven dan biarkan dingin selama 15 menit. Lepaskan sisi-sisi loyang. Cara mudah untuk melakukannya adalah dengan meletakkan loyang di atas kaleng berisi kacang-kacangan dan menekan tepi loyang secara perlahan.\r\nPindahkan kue tart, yang alasnya sudah terpasang, ke piring saji. Sajikan hangat dengan krim, crème fraiche, atau es krim.",
    }    
}
```

Response Body Error :
```json
{
    "errors" : "meal is not found"
}
```

## Remove Meal API

Endpoint : DELETE /api/meals/:id

Headers :
- Authorization : Token



Response Body Success :
```json
{
   "data" : "OK" 
}
```

Response Body Error :
```json
{
    "errors" : "meal is not found"
}
```