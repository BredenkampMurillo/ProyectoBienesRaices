//PARTE DE LAS PROPIEDADES

$(document).ready(function () {
    const apiURL = "./propiedades.json";
    function fetchProperties() {
      $.ajax({
        url: apiURL,
        method: "GET",
        success: function (data) {
          const propiedades = data.propiedades;
          const $container = $("#datosPropiedades"); 
  
          $container.empty();
  
          propiedades.forEach((propiedad) => {
            const html = `
              <div class="col-md-4">
                <div class="card-box-a card-shadow">
                  <div class="img-box-a">
                    <img src="${propiedad.imagen}" alt="" class="img-a img-fluid">
                  </div>
                  <div class="card-overlay">
                    <div class="card-overlay-a-content">
                      <div class="card-header-a">
                        <h2 class="card-title-a">
                          <a href="#">${propiedad.clasificacion}</a>
                        </h2>
                        <p class="link-a">${propiedad.descripcion}</p>
                      </div>
                      <div class="card-body-a">
                        <div class="price-box d-flex">
                          <span class="price-a">${propiedad.tipo} | $ ${propiedad.precio}</span>
                        </div>
                      </div>
                      <div class="card-footer-a">
                        <ul class="card-info d-flex justify-content-around">
                          <li>
                            <h4 class="card-info-title">Area</h4>
                            <span>${propiedad.detalle.area}m<sup>2</sup></span>
                          </li>
                          <li>
                            <h4 class="card-info-title">Cuartos</h4>
                            <span>${propiedad.detalle.cuartos}</span>
                          </li>
                          <li>
                            <h4 class="card-info-title">Pisos</h4>
                            <span>${propiedad.detalle.pisos}</span>
                          </li>
                          <li>
                            <h4 class="card-info-title">Garaje</h4>
                            <span>${propiedad.detalle.garaje}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
            $container.append(html);
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al cargar las propiedades:", error);
          $("#datosPropiedades").html(
            "<p>Error al cargar las propiedades. Intenta nuevamente más tarde.</p>"
          );
        },
      });
    }
    fetchProperties();
  });
