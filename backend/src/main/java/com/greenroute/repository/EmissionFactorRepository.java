package com.greenroute.repository;

import com.greenroute.model.EmissionFactorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmissionFactorRepository extends JpaRepository<EmissionFactorEntity, Long> {
    Optional<EmissionFactorEntity> findByTravelModeIgnoreCase(String travelMode);
}
