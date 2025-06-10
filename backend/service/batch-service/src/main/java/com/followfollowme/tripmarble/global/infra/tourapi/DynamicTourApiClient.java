package com.followfollowme.tripmarble.global.infra.tourapi;

import com.followfollowme.tripmarble.global.infra.tourapi.eums.TourApi;
import com.followfollowme.tripmarble.global.infra.tourapi.properties.TourApiRegistryProperties;
import com.followfollowme.tripmarble.global.infra.tourapi.properties.TourApiRegistryProperties.TourApiSpec;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DynamicTourApiClient {

    private final WebClient webClient;
    private final TourApiRegistryProperties registryProperties;

    public <T> TourApiRoot<T> fetch(
        TourApi api,
        ParameterizedTypeReference<TourApiRoot<T>> responseType
    ) {
        return fetch(api, null, responseType);
    }

    public <T> TourApiRoot<T> fetch(
        TourApi api,
        Map<String, String> additionalParams,
        ParameterizedTypeReference<TourApiRoot<T>> responseType
    ) {
        TourApiSpec spec = resolveSpec(api);
        Map<String, String> mergedParams = mergeParams(spec, additionalParams);
        URI uri = buildUri(spec.url(), mergedParams);

        log.info("[TourAPI 요청] {}.{}: {}", api.getCategory(), api.getName(), uri);
        return fetchResponse(uri, responseType);
    }

    private TourApiSpec resolveSpec(TourApi api) {
        return Optional.ofNullable(
                registryProperties.categories()
                    .get(api.getCategory())
                    .apis()
                    .get(api.getName())
            )
            .orElseThrow(() -> new IllegalArgumentException("등록되지 않은 API: " + api));
    }

    private Map<String, String> mergeParams(TourApiSpec spec, Map<String, String> additionalParams) {
        Map<String, String> merged = new HashMap<>(registryProperties.defaultParams());
        if (spec.params() != null) merged.putAll(spec.params());
        if (additionalParams != null) merged.putAll(additionalParams);
        return merged;
    }

    private URI buildUri(String url, Map<String, String> params) {
        String encodedServiceKey = URLEncoder.encode(registryProperties.serviceKey(), StandardCharsets.UTF_8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
            .queryParam("serviceKey", encodedServiceKey);

        params.remove("serviceKey");
        params.forEach(builder::queryParam);
        return URI.create(builder.build(false).toUriString());
    }

    private <T> TourApiRoot<T> fetchResponse(URI uri, ParameterizedTypeReference<TourApiRoot<T>> responseType) {
        return webClient.get()
            .uri(uri)
            .accept(MediaType.APPLICATION_JSON)
            .exchangeToMono((ClientResponse response) -> {
                MediaType contentType = response.headers().contentType()
                    .orElse(MediaType.APPLICATION_OCTET_STREAM);

                if (contentType.includes(MediaType.APPLICATION_XML)) {
                    return response.bodyToMono(String.class)
                        .doOnNext(body -> log.warn("[TourAPI] XML 응답 무시됨:\n{}", body))
                        .then(Mono.empty());
                }

                return response.bodyToMono(responseType);
            })
            .block();
    }
}
