package codeclowns.planny.planny.service.impl;

import codeclowns.planny.planny.data.dto.WorkspacesDto;
import codeclowns.planny.planny.data.entity.AccountE;
import codeclowns.planny.planny.data.entity.WorkSpaceE;
import codeclowns.planny.planny.repository.AccountRepository;
import codeclowns.planny.planny.repository.WorkSpacesRepository;
import codeclowns.planny.planny.security.service.AuthService;
import codeclowns.planny.planny.service.WorkSpacesService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkSpacesServiceImpl implements WorkSpacesService {
    private final WorkSpacesRepository workSpacesRepository;
    private final AccountRepository accountRepository;
    private final HttpServletRequest request;
    private final AuthService authService;

    public List<WorkSpaceE> getAllEnableWorkspaces(WorkspacesDto workspacesDto) throws Exception {
        AccountE currentAccount = authService.getCurrentUser();
        if (currentAccount == null) {
            throw new IllegalStateException("User not logged in or session expired");
        }
        return workSpacesRepository.findAllByIsEnabledTrueAndUserId(Long.valueOf(currentAccount.getAccountId()));
    }

    @Override
    public List<WorkSpaceE> getAllWorkspaces(WorkspacesDto workspacesDto) {
        return workSpacesRepository.findAll();
    }

    @Override
    public WorkSpaceE saveWorkspace(WorkspacesDto workspacesDto) throws Exception {
        AccountE currentAccount = authService.getCurrentUser();
        if (currentAccount == null) {
            throw new IllegalStateException("User not logged in or session expired");
        }
        currentAccount = accountRepository.findById(currentAccount.getAccountId())
                .orElseThrow(() -> new IllegalStateException("User account not found in the database"));
        System.out.println("User ID: " + currentAccount.getAccountId());

        WorkSpaceE workSpaceE = convertToEntity(workspacesDto);

        workSpaceE.setUser(currentAccount.getUser());
        return workSpacesRepository.save(workSpaceE);
    }

    @Override
    public Object deleteWorkspace(WorkspacesDto workspacesDto) throws Exception {
        HttpSession session = request.getSession();
        AccountE currentAccount = (AccountE) session.getAttribute("currentAccount");
        if (currentAccount == null) {
            throw new IllegalStateException("User not logged in or session expired");
        } else {
            AccountE managedAccount = accountRepository.findById(currentAccount.getAccountId()).orElse(null);
            if (managedAccount == null) {
                throw new IllegalStateException("User account not found in the database");
            }
            int exists = workSpacesRepository.existsByWorkspaceName(workspacesDto.getWorkspaceName());
            if (exists > 0) {
                WorkSpaceE existingWorkSpace = workSpacesRepository.findByWorkspaceName(workspacesDto.getWorkspaceName());
                workSpacesRepository.delete(existingWorkSpace);
            }
        }
        return null;
    }

    private WorkSpaceE convertToEntity(WorkspacesDto dto) {
        return WorkSpaceE.builder()
                .workspaceName(dto.getWorkspaceName())
                .shortName(dto.getShortName())
                .website(dto.getWebsite())
                .description(dto.getDescription())
                .isEnabled(dto.isEnabled())
                .build();
    }
}
