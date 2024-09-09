package com.example.back_tangoApp.Entities;

import com.example.back_tangoApp.Services.Dtos.Request.PedidoRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="PEDIDOS")
@Entity
public class Pedido {
    @Id
    @GeneratedValue(generator = "PEDIDOS")
    @TableGenerator(name = "PEDIDOS", table = "sqlite_sequence",
            pkColumnName = "name", valueColumnName = "seq",
            pkColumnValue = "PEDIDOS", allocationSize = 1,
            initialValue = 1)
    private Long num_pedidos;

    @ManyToOne
    @JoinColumn(name = "tipo_carga")
    private TipoCarga tipoDeCarga;

    @ManyToOne
    @JoinColumn(name = "id_dador")
    private DadorDeCarga dadorDeCarga;

    @Column(name = "fec_retiro")
    private LocalDate fecRetiro;

    @Column(name = "fec_entrega")
    private LocalDate fecEntrega;

    @Column(name = "id_provincia_r")
    private String idProvinciaR;

    @Column(name = "provincia_r")
    private String provincia;

    @Column(name = "id_localidad_r")
    private String idLocalidadR;

    @Column(name = "localidad_r")
    private String localidadR;

    @Column(name = "calle_r")
    private String calleR;

    @Column(name = "nro_calle_r")
    private Integer numeroCalleR;

    @Column(name = "referencia_r")
    private String referenciaR;

    @Column(name = "id_provincia_e")
    private String idProvinciaE;

    @Column(name = "provincia_e")
    private String provinciaE;

    @Column(name = "id_localidad_e")
    private String idLocalidadE;

    @Column(name = "localidad_e")
    private String localidadE;

    @Column(name = "calle_e")
    private String calleE;

    @Column(name = "nro_calle_e")
    private Integer numeroCalleE;

    @Column(name = "referencia_e")
    private String referenciaE;

    @OneToMany(mappedBy = "pedido", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Imagen> imagenes = new ArrayList<>();


    public Pedido(
            PedidoRequest pedidoRequest,
            TipoCarga tipoDeCarga,
            DadorDeCarga dadorDeCarga
    ) {
        this.tipoDeCarga = tipoDeCarga;
        this.dadorDeCarga = dadorDeCarga;
        this.fecRetiro = pedidoRequest.getFechaRetiro();
        this.fecEntrega = pedidoRequest.getFechaEntrega();
        this.idProvinciaR = pedidoRequest.getDomicilioRequestDtoRetrio().getIdProvincia();
        this.provincia = pedidoRequest.getDomicilioRequestDtoRetrio().getProvincia();
        this.idLocalidadR = pedidoRequest.getDomicilioRequestDtoRetrio().getIdLocalidad();
        this.localidadR = pedidoRequest.getDomicilioRequestDtoRetrio().getLocalidad();
        this.calleR = pedidoRequest.getDomicilioRequestDtoRetrio().getCalle();
        this.numeroCalleR = pedidoRequest.getDomicilioRequestDtoRetrio().getNumero();
        this.referenciaR = pedidoRequest.getDomicilioRequestDtoRetrio().getReferencia();
        this.idProvinciaE = pedidoRequest.getDomicilioRequestDtoEntrega().getIdProvincia();
        this.provinciaE = pedidoRequest.getDomicilioRequestDtoEntrega().getProvincia();
        this.idLocalidadE = pedidoRequest.getDomicilioRequestDtoEntrega().getIdLocalidad();
        this.localidadE = pedidoRequest.getDomicilioRequestDtoEntrega().getLocalidad();
        this.calleE = pedidoRequest.getDomicilioRequestDtoEntrega().getCalle();
        this.numeroCalleE = pedidoRequest.getDomicilioRequestDtoEntrega().getNumero();
        this.referenciaE = pedidoRequest.getDomicilioRequestDtoEntrega().getReferencia();
    }

}
