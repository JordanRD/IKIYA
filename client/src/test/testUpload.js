import React, { useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
    const fileRef = useRef()
    const [files, setFiles] = useState([])

    const handleSubmit = i => {
        i.preventDefault();
        const formData = new FormData();
        files.forEach(file => {
            formData.append('IMG', file);
        })
        formData.append('PRODUCT_DATA', JSON.stringify({ name: 'nike', price: 4000000 }))
        console.log(formData.getAll('IMG'))
        console.log(fileRef.current)
        // axios.post('http://localhost:2000/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        //   .then(res => {
        //     console.log(res.data)
        //     setFiles([])
        //   })
        //   .catch(err => console.log(err.response.messages))
    }
    return (
        <div className="App" >
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input ref={fileRef} accept='image/*' style={{ display: 'none', pointerEvents: 'none' }} onChange={({ target }) => setFiles(prev => [...prev, ...target.files])} type="file" multiple />
                <button type="submit">submit</button>
                <button type="button" onClick={() => fileRef.current.click()}>select</button>
            </form>
            <div style={{ margin: '50px', display: 'flex', flexWrap: 'wrap' }}>
                {files.map((image, index) => {
                    const selectedImage = URL.createObjectURL(image)
                    return (
                        <div key={index} style={{ position: 'relative', }}>
                            <img alt='pict' style={{ height: '100px', width: '100px', objectFit: 'contain', padding: '20px', border: '1px solid black' }} src={selectedImage} />
                            <button onClick={() => setFiles(files.filter((_, i) => i !== index))} style={{ border: 'none', borderRadius: '100px', backgroundColor: 'red', position: 'absolute', right: '0' }}>X</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default App;