package codeclowns.planny.planny.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkspacesDto {
    private Integer workspaceId;
    private String workspaceName;
    private String shortName;
    private String website;
    private String description;
    private boolean isEnabled=true ;
//    private UserE user;
}
