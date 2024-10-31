package com.example.back_tangoApp.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="IMAGENES")
@Entity
public class Imagen {
    @Id
    @GeneratedValue(generator = "IMAGENES")
    @TableGenerator(name = "IMAGENES", table = "sqlite_sequence",
            pkColumnName = "name", valueColumnName = "seq",
            pkColumnValue = "IMAGENES", allocationSize = 1,
            initialValue = 1)
    private Long idImagenes;

    @ManyToOne
    @JoinColumn(name = "num_pedido")
    @JsonIgnore
    private Pedido pedido;

    @Column(name = "link")
    private String link;

    public Imagen(Pedido pedido, String link) {
        this.pedido = pedido;
        this.link = link;
    }

}
