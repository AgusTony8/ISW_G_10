package com.example.back_tangoApp.Services;

import com.example.back_tangoApp.Entities.Imagen;
import com.example.back_tangoApp.Entities.Pedido;
import com.example.back_tangoApp.Repositories.ImagenRepository;
import com.example.back_tangoApp.Repositories.PedidoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class ImagenService {

    private final ImagenRepository imagenRepository;

    public void addImagenes(ArrayList<String> urls, Pedido pedido){

        ArrayList <Imagen> imagenes = new ArrayList<>();

        if (urls != null){
            urls.stream().forEach(url -> {
                Imagen imagen = new Imagen(pedido, url);
                this.imagenRepository.saveAndFlush(imagen);
                imagenes.add(imagen);
            });
        }

        pedido.setImagenes(imagenes);
    }
}
