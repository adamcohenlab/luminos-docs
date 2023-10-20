%> @file Rig_Control_App.m
% ======================================================================
%> @brief Rig_Control_App is the base class for all applications in luminos
%
%> Rig_Control_App objects contain the core methods necessary for constructing the virtual 
%> devices for the app from the information in the Rig_Init file, passing data between the user 
%> interface and device layers, saving experimental and logfile data, and monitoring for key events
%> from the user interface and virtual devices.
% ======================================================================
classdef Rig_Control_App < matlab.apps.AppBase & matlab.mixin.SetGetExactNames
    properties (Transient)
        %> Array of Cohen_Virtual_Device objects for virtual devices
        Devices = Cohen_Virtual_Device.empty;
        
        %> Logical indexing vector for data-saving portion
        monitored_devices_index;
        
        %> Listener object for exp_finished event
        explistener;
        
        %> Name of the experiment type
        Experiment;
        
        %> Folder for storing individual experiment data
        expfolder;
        
        %> File for saving virtual device data
        datafile;
        
        %> Path to the luminos repository
        basepath;
        
        %> Directory for storing data by date
        datafolder;
        
        %> Path to remote server for data copying
        server_target;
        
        %> Rig_Initializer object
        Rig_Init Rig_Initializer;
        
        %> User_Key object
        User User_Key;
        
        %> File for recording log data
        logfile;
        
        %> Flag indicating screen blanking status
        screen_blanked = false;
        
        %> Flag indicating experiment completion
        exp_complete = false;
        
        %> Flag indicating if any data has been acquired
        isDataAcquired = false;
    
        %> JS_Server object for communication with the JS frontend
        jsServer JS_Server;
        
        %> Flag for VR mode
        VR_On logical = false;
        
        %> VR client object
        VRclient;
        
        %> Flag indicating app deletion from JS
        wasAppDeletedFromJS = false;
    end
    
    properties (Constant)
        %> Port number for JS communication
        jsPort = 3010;
    end
    
    properties
        %> Git information
        gitInfo;
        
        %> Name of the rig
        rigName;
    end
    

    events
        exp_finished % Event for experiment completion
    end

    methods
        % ======================================================================
        %> @brief Class constructor
        %>
        %> @param rigName Name of the rig
        %> @param username Name of the user
        %> @param options Optional arguments
        %>
        %> @retval app Rig_Control_App object
        % ======================================================================
        